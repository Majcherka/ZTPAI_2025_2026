from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from app.database import engine, Base
from app.routers import auth, listings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Roommate Finder API",
    description="API do szukania wspolokatora",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",    
    "http://127.0.0.1:5173",
    "http://localhost:3000",   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)
# ----------------------------------------

app.include_router(auth.router)
app.include_router(listings.router)

@app.get("/")
def read_root():
    return {"message": "Witaj w API Roommate Finder (Python/FastAPI)!"}