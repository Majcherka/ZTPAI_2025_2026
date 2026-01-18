from fastapi import FastAPI
from app.database import engine, Base
from app.routers import auth, listings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Roommate Finder API",
    description="API do szukania współlokatora",
    version="1.0.0"
)

app.include_router(auth.router)
app.include_router(listings.router) 

@app.get("/")
def read_root():
    return {"message": "Witaj w API Roommate Finder (Python/FastAPI)!"}