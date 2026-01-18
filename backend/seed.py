from faker import Faker
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Base, User, Listing
from app.routers.auth import get_password_hash
import random

fake = Faker('pl_PL')

def seed_data():
    db = SessionLocal()
    
    print("--- ROZPOCZYNAM GENEROWANIE DANYCH ---")

    print("-> Tworzenie uzytkownikow...")
    users = []
    default_password_hash = get_password_hash("haslo123")

    for _ in range(10):
        email = fake.unique.email()
        user = User(
            email=email,
            hashed_password=default_password_hash,
            is_active=True,
            role="USER"
        )
        users.append(user)
        db.add(user)
    
    db.commit() 
    
    for u in users:
        db.refresh(u)

    print("-> Tworzenie ogłoszen...")
    cities = ["Warszawa", "Kraków", "Gdańsk", "Wrocław", "Poznań", "Łódź"]
    
    for _ in range(30):
        random_user = random.choice(users)
        listing = Listing(
            title=fake.sentence(nb_words=4).replace(".", ""),
            description=fake.text(max_nb_chars=200),
            city=random.choice(cities),
            price=round(random.uniform(800.0, 3500.0), 2),
            user_id=random_user.id
        )
        db.add(listing)

    db.commit()
    print("--- SUKCES! DANE WYGENEROWANE ---")
    print(f"Dodano {len(users)} uzytkownikow i 30 ogłoszeń.")
    db.close()

if __name__ == "__main__":
    seed_data()