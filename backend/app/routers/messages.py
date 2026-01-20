from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Message, User
from app.schemas import MessageCreate, MessageResponse
from app.routers.auth import get_current_user

router = APIRouter(prefix="/messages", tags=["Messages"])

@router.post("/", response_model=MessageResponse)
def send_message(message: MessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    recipient = db.query(User).filter(User.id == message.recipient_id).first()
    if not recipient:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_message = Message(
        sender_id=current_user.id,
        recipient_id=message.recipient_id,
        content=message.content
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    
    return MessageResponse(
        id=new_message.id,
        sender_id=new_message.sender_id,
        recipient_id=new_message.recipient_id,
        content=new_message.content,
        timestamp=new_message.timestamp,
        sender_email=current_user.email,
        recipient_email=recipient.email
    )

@router.get("/sent", response_model=List[MessageResponse])
def get_sent_messages(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    messages = db.query(Message).filter(Message.sender_id == current_user.id).all()
    return [
        MessageResponse(
            id=m.id,
            sender_id=m.sender_id,
            recipient_id=m.recipient_id,
            content=m.content,
            timestamp=m.timestamp,
            sender_email=current_user.email,
            recipient_email=m.recipient.email
        ) for m in messages
    ]

@router.get("/received", response_model=List[MessageResponse])
def get_received_messages(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    messages = db.query(Message).filter(Message.recipient_id == current_user.id).all()
    return [
         MessageResponse(
            id=m.id,
            sender_id=m.sender_id,
            recipient_id=m.recipient_id,
            content=m.content,
            timestamp=m.timestamp,
            sender_email=m.sender.email,
            recipient_email=current_user.email
        ) for m in messages
    ]