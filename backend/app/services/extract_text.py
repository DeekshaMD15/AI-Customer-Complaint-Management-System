import pdfplumber
from docx import Document


def extract_text(file_path: str) -> str:
    """
    Extract text from PDF, DOCX, or TXT files.
    """

    if file_path.lower().endswith(".pdf"):
        text = ""

        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

        return text

    elif file_path.lower().endswith(".docx"):
        doc = Document(file_path)
        return "\n".join([paragraph.text for paragraph in doc.paragraphs])

    elif file_path.lower().endswith(".txt"):
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()

    return "Unsupported file type."