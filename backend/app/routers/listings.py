from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Listing, User
from app.schemas import ListingCreate, ListingResponse
from app.routers.auth import get_current_user
from app.services.rabbitmq import send_message_to_queue

router = APIRouter(prefix="/listings", tags=["Listings"])

@router.post("/", response_model=ListingResponse)
async def create_listing(listing: ListingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_listing = Listing(**listing.dict(), user_id=current_user.id)
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    
    message = {
        "event": "new_listing",
        "user_email": current_user.email,
        "listing_title": new_listing.title,
        "listing_id": new_listing.id
    }
    await send_message_to_queue(message)

    return new_listing
@router.get("/me", response_model=List[ListingResponse])
def read_my_listings(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return current_user.listings

@router.get("/{listing_id}", response_model=ListingResponse)
def read_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if listing is None:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.get("/", response_model=List[ListingResponse])
def read_listings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    listings = db.query(Listing).offset(skip).limit(limit).all()
    return listings

@router.post("/{listing_id}/favorite")
def toggle_favorite(listing_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    if listing in current_user.favorites:
        current_user.favorites.remove(listing)
        msg = "removed"
    else:
        current_user.favorites.append(listing)
        msg = "added"
        
    db.commit()
    return {"status": msg}