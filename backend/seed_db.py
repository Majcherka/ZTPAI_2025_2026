from app.database import SessionLocal, engine
from app import models
from app.utils import get_password_hash
import random

# Upewnij się, że tabele istnieją
models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed_data():
    print("--- Rozpoczynam generowanie danych testowych ---")

    # 1. Tworzenie Użytkowników (10 sztuk)
    # Hasło dla wszystkich to: test1234
    hashed_pwd = get_password_hash("test1234")
    
    users = []
    print("Tworzenie użytkowników...")
    for i in range(1, 11):
        email = f"student{i}@example.com"
        # Sprawdź czy user już istnieje, żeby nie dublować
        existing = db.query(models.User).filter(models.User.email == email).first()
        if not existing:
            user = models.User(
                email=email,
                hashed_password=hashed_pwd,
                role="USER",
                is_active=True
            )
            db.add(user)
            users.append(user)
    
    db.commit()
    # Musimy pobrać userów z bazy, żeby mieć ich prawdziwe ID
    all_users = db.query(models.User).all()
    
    if len(all_users) < 2:
        print("BŁĄD: Za mało użytkowników w bazie do utworzenia relacji.")
        return

    # 2. Tworzenie Ogłoszeń (15 sztuk)
    print("Tworzenie ogłoszeń...")
    cities = ["Warszawa", "Kraków", "Gdańsk", "Wrocław", "Poznań"]
    titles = ["Pokój jednoosobowy", "Mieszkanie studenckie", "Kawalerka w centrum", "Pokój z balkonem", "Miejsce w pokoju 2-os"]
    
    for i in range(15):
        owner = random.choice(all_users)
        listing = models.Listing(
            title=f"{random.choice(titles)} - nr {i+1}",
            description="Przestronny, jasny pokój w świetnej lokalizacji. Blisko uczelni i sklepów. Internet w cenie.",
            city=random.choice(cities),
            price=float(random.randint(800, 2500)),
            user_id=owner.id
        )
        db.add(listing)
    
    db.commit()

    # 3. Tworzenie Wiadomości (10 sztuk)
    print("Tworzenie wiadomości...")
    messages_content = ["Cześć, czy oferta aktualna?", "Kiedy można oglądać?", "Jestem zainteresowany.", "Jaka kaucja?"]
    
    for i in range(10):
        sender = random.choice(all_users)
        recipient = random.choice(all_users)
        
        # Żeby nie wysyłał do siebie samego
        while sender.id == recipient.id:
            recipient = random.choice(all_users)
            
        msg = models.Message(
            sender_id=sender.id,
            recipient_id=recipient.id,
            content=random.choice(messages_content)
        )
        db.add(msg)

    db.commit()
    print("--- SUKCES: Wygenerowano dane testowe! ---")
    print(f"Baza zawiera teraz ponad {len(all_users) + 15 + 10} rekordów.")

if __name__ == "__main__":
    seed_data()