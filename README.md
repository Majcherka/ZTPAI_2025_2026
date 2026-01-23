# Roommate Finder - ZTPAI 2025/2026

Aplikacja webowa ułatwiająca wyszukiwanie współlokatorów i pokoi. System umożliwia rejestrację użytkowników, przeglądanie ogłoszeń oraz dodawanie nowych ofert po zalogowaniu.

## Technologie

### Backend
* **Python 3.10+**
* **FastAPI** (API REST)
* **SQLAlchemy** (ORM)
* **PostgreSQL** (Baza danych)
* **Aio-pika** (Obsługa RabbitMQ)
* **Argon2** (Haszowanie haseł)
* **Pytest** (Testy jednostkowe)

### Frontend
* **React + Vite**
* **React Bootstrap**
* **Axios** (Komunikacja z API)
* **React Router** (Nawigacja)

### Infrastruktura
* **Docker & Docker Compose** (Konteneryzacja Bazy i RabbitMQ)
* **RabbitMQ** (Kolejkowanie zadań asynchronicznych - powiadomienia)

## Uruchomienie projektu

### 1. Wymagania wstępne
Upewnij się, że masz zainstalowane:
* Docker Desktop
* Python 3.10+
* Node.js (v18+)

### 2. Uruchomienie infrastruktury (Baza + RabbitMQ)
W głównym katalogu projektu:
```bash
docker-compose up -d

```

### 3.Konfiguracja i uruchomienie Backendu
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate
```

Zainstaluj zależności:
```bash
pip install -r requirements.txt
```
Uruchom serwer backendu:
```bash
uvicorn main:app --reload
```

Seedowanie bazy:
```bash
python seed_db.py
```

### 4. Konfiguracja front-end

```
cd frontend
npm install
```

Uruchomienie aplikacji:

```bash
npm run dev
```

Aplikacja uruchomi się pod adresem: http://localhost:5173


