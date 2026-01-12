from fastapi import FastAPI
from app.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Roommate Finder API",
    description="API do szukania współlokatora",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Witaj w API Roommate Finder (Python/FastAPI)!"}

@app.get("/health")
def health_check():
    return {"status": "ok", "db": "connected"}