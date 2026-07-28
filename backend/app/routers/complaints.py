from fastapi import APIRouter, HTTPException

from app.database.db import SessionLocal
from app.models.complaint import Complaint

router = APIRouter(prefix="/api", tags=["Complaints"])


@router.get("/complaints")
def get_complaints():
    db = SessionLocal()

    complaints = (
        db.query(Complaint)
        .order_by(Complaint.id.desc())
        .all()
    )

    db.close()

    return complaints


@router.delete("/complaints/{complaint_id}")
def delete_complaint(complaint_id: int):

    db = SessionLocal()

    complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if not complaint:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    db.delete(complaint)
    db.commit()
    db.close()

    return {
        "message": "Complaint deleted successfully"
    }