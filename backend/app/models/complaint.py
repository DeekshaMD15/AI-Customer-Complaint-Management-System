from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.db import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String(255))
    complaint_source = Column(String(100))
    product_name = Column(String(255))
    batch_number = Column(String(100))
    manufacturing_date = Column(String(50))

    complaint_description = Column(String(2000))

    severity = Column(String(50))
    priority = Column(String(50))

    status = Column(String(50), default="New")

    created_at = Column(DateTime, default=datetime.utcnow)