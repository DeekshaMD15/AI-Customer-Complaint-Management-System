# 🤖 AI Customer Complaint Management System

An AI-powered web application that automates customer complaint processing for pharmaceutical products. The system extracts complaint details from uploaded text files, analyzes them using AI, classifies severity and priority, provides root cause analysis and CAPA recommendations, and stores complaint history for efficient tracking.

---

## 🚀 Features

- 📄 Upload complaint text files
- 🤖 AI-powered complaint analysis using Groq LLM
- 📝 Automatic extraction of complaint details
- 🚨 Severity and Priority prediction
- 🔍 Root Cause Recommendation
- ⚠️ AI Risk Assessment
- ✅ CAPA (Corrective and Preventive Action) Recommendations
- 📊 Interactive Dashboard with complaint statistics
- 📚 Complaint History Management
- ✏️ Edit and Delete complaints
- 🔎 Search and Filter complaints
- 💾 Complaint data stored in MySQL

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Material UI
- Axios

### Backend
- FastAPI
- SQLAlchemy
- MySQL

### AI
- Groq LLM
- LangChain

---

## 📂 Project Structure

```
AI-Customer-Complaint-Management-System
│
├── backend
│   ├── app
│   ├── uploads
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   └── ...
│
├── sample-data
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/DeekshaMD15/AI-Customer-Complaint-Management-System.git
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📸 Application Modules

- Dashboard
- Upload Complaint
- Complaint Details
- AI Copilot
- Complaint History
- Search & Filter

---

## 🔮 Future Enhancements

- PDF Complaint Upload
- Email Notifications
- AI Trend Analysis
- Role-Based Login
- Complaint Analytics Dashboard

---

## 👩‍💻 Author

**Deeksha M D**

Bachelor of Engineering (Electronics & Communication Engineering)
