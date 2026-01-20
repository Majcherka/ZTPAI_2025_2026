from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    user_id: int

class ListingBase(BaseModel):
    title: str
    description: str | None = None
    city: str
    price: float

class ListingCreate(ListingBase):
    pass

class ListingResponse(ListingBase):
    id: int
    user_id: int 
    
    class Config:
        from_attributes = True

class MessageCreate(BaseModel):
    recipient_id: int
    content: str

class MessageResponse(BaseModel):
    id: int
    sender_id: int
    recipient_id: int
    content: str
    timestamp: datetime
    
    sender_email: str | None = None
    recipient_email: str | None = None

    class Config:
        from_attributes = True        