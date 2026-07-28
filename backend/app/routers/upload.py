from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.extract_text import extract_text
from app.ai.graph import graph

from app.database.db import SessionLocal
from app.models.complaint import Complaint

router = APIRouter(prefix="/api", tags=["Upload"])

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from uploaded file
    extracted_text = extract_text(file_path)

    # LangGraph AI workflow
    result = graph.invoke(
        {
            "complaint_text": extracted_text
        }
    )

    structured_data = result["structured_data"]

    # Save complaint to MySQL
    db = SessionLocal()

    complaint = Complaint(
        customer_name=structured_data.get("customer_name"),
        complaint_source=structured_data.get("complaint_source"),
        product_name=structured_data.get("product_name"),
        batch_number=structured_data.get("batch_number"),
        manufacturing_date=structured_data.get("manufacturing_date"),
        complaint_description=structured_data.get("complaint_description"),
        severity=structured_data.get("severity"),
        priority=structured_data.get("priority"),
        status="New",
    )

    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    db.close()

    return {
        "filename": file.filename,
        "raw_text": extracted_text,
        "structured_data": structured_data,
    }