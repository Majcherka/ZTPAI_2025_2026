import sys
import os
from passlib.context import CryptContext

sys.path.append(os.getcwd())

from app.database import SessionLocal
from app.models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def create_admin():
    db = SessionLocal()
    
    email = "admin@example.com"
    password = "admin123"
    
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        print(f"Użytkownik {email} już istnieje.")
        db.close()
        return

    admin_user = User(
        email=email,
        hashed_password=get_password_hash(password),
        role="ADMIN",
        is_active=True
    )
    
    db.add(admin_user)
    db.commit()
    print(f"SUKCES: Utworzono konto administratora: {email} / {password}")
    db.close()

if __name__ == "__main__":
    create_admin()