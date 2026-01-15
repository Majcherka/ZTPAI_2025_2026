from fastapi import FastAPI
from app.database import engine, Base
from app.routers import auth  

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Roommate Finder API",
    description="API do szukania wspollokatora",
    version="1.0.0"
)

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Witaj w API Roommate Finder (Python/FastAPI)!"}