import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

print("Groq Key:", os.getenv("GROQ_API_KEY"))

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = os.getenv("MODEL_NAME", "llama-3.3-70b-versatile")


def extract_complaint_details(text: str):
    prompt = f"""
You are an AI assistant.

Extract the complaint information and return ONLY valid JSON.

Schema:

{{
    "customer_name": "",
    "complaint_source": "",
    "product_name": "",
    "batch_number": "",
    "manufacturing_date": "",
    "complaint_description": "",
    "severity": "",
    "priority": ""
}}

Complaint:

{text}
"""

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content.strip()

    print("\n===== GROQ RESPONSE =====")
    print(content)
    print("=========================\n")

    # Remove markdown code blocks if present
    if content.startswith("```"):
        content = (
            content.replace("```json", "")
                   .replace("```", "")
                   .strip()
        )

    try:
        return json.loads(content)

    except json.JSONDecodeError:
        return {
            "error": "Groq did not return valid JSON",
            "raw_response": content
        }