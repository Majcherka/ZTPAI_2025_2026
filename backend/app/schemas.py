from pydantic import BaseModel, EmailStr

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