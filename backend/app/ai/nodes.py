import json
import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from app.ai.state import ComplaintState

# Load .env
load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)



def extract_complaint(state: ComplaintState):

    prompt = f"""
You are an AI Quality Management System (QMS) assistant for a pharmaceutical manufacturing company.

Analyze the following customer complaint.

Return ONLY valid JSON.

Complaint:

{state["complaint_text"]}

Return these fields:

customer_name
complaint_source
product_name
batch_number
manufacturing_date
complaint_description
severity
priority
root_cause
risk_assessment
recommended_actions

Rules:

- severity must be High, Medium or Low.
- priority must be High, Medium or Low.
- root_cause should be 1 concise sentence describing the most likely cause.
- risk_assessment should be exactly 2 concise sentences (maximum 40 words).
recommended_actions should contain exactly 4 short action items (5–10 words each).

Example:

{{
  "customer_name": "ABC Pharma",
  "complaint_source": "Email",
  "product_name": "Paracetamol 500mg",
  "batch_number": "B12345",
  "manufacturing_date": "15-Jan-2026",
  "complaint_description": "Tablets were chipped.",
  "severity": "Medium",
  "priority": "Medium",
  "root_cause": "Possible contamination during the blister packaging process.",
  "risk_assessment": "The complaint indicates a possible manufacturing or packaging issue requiring investigation.",
  "recommended_actions": [
    "Inspect affected batch",
    "Notify QA department",
    "Review manufacturing records",
    "Monitor similar complaints"
  ]
}}
"""

    response = llm.invoke(prompt)

    print("===== LLM RESPONSE =====")
    print(response.content)
    print("========================")

    content = response.content.strip()

    # Remove markdown if present
    content = content.replace("```json", "").replace("```", "").strip()

    try:
        data = json.loads(content)
    except Exception:
        data = {
    "customer_name": "",
    "complaint_source": "",
    "product_name": "",
    "batch_number": "",
    "manufacturing_date": "",
    "complaint_description": content,
    "severity": "Medium",
    "priority": "Medium",
    "root_cause": "Unable to determine the root cause.",
    "risk_assessment": "Unable to generate AI risk assessment.",
    "recommended_actions": [
        "Review complaint manually",
        "Notify QA",
        "Investigate batch",
        "Document findings"
    ]
}

    return {
        "structured_data": data
    }