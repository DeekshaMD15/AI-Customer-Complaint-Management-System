from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.upload import router as upload_router
from app.database.db import Base, engine
from app.models.complaint import Complaint
from app.routers.complaints import router as complaints_router
from app.routers.update import router as update_router
app = FastAPI(
    title="AI Customer Complaint Management System API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)
# Create database tables
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:5174",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(upload_router)

@app.get("/")
async def root():
    return {
        "message": "AI Customer Complaint Management System API is Running 🚀"
    }
# 👇 Add it here
app.include_router(upload_router)
app.include_router(complaints_router) 
app.include_router(update_router)  

@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }