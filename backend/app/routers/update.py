from fastapi import APIRouter, HTTPException
from app.database.db import SessionLocal
from app.models.complaint import Complaint

router = APIRouter(prefix="/api", tags=["Update"])


@router.put("/complaints/{complaint_id}")
def update_complaint(complaint_id: int, complaint: dict):

    db = SessionLocal()

    db_complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if not db_complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    db_complaint.customer_name = complaint["customer_name"]
    db_complaint.product_name = complaint["product_name"]
    db_complaint.batch_number = complaint["batch_number"]
    db_complaint.severity = complaint["severity"]
    db_complaint.status = complaint["status"]
    db_complaint.complaint_description = complaint["complaint_description"]

    db.commit()
    db.refresh(db_complaint)

    return db_complaint