from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="USER")
    is_active = Column(Boolean, default=True)

    listings = relationship("Listing", back_populates="owner")

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True)
    city = Column(String, index=True, nullable=False)
    price = Column(Float, nullable=False)
    
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="listings")