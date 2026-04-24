# 🤖 AI Student Assistant (MERN + Gemini AI)

Structured prompts are used instead of raw input to control AI output and ensure consistent, reliable responses.

A full-stack AI web app that helps users:
- Explain concepts  
- Generate MCQs  
- Summarize text  
- Improve writing  

Built using **React, Node.js, Express, and Google Gemini API**.

---

## 🚀 Features

- Multiple AI task modes  
- Structured prompt engineering  
- Real-time response + loading UI  
- Secure API key using `.env`  
- Clean, responsive UI  

---

## ⚙️ Setup

### 🔹 Backend
```bash
cd server
npm install
```

### Create .env:
```bash
GEMINI_API_KEY=your_api_key
PORT=5000
```

### Run:
```bash
npm run dev
```

### 🔹 Frontend
```bash
cd client
npm install
npm run dev
```

### 🔗 API
```bash
**Endpoint:**

POST /api/ai/generate
**Example Request:**
{
  "prompt": "Explain JavaScript closures",
  "mode": "explain"
}
```

### 🧠 Prompt Design
```bash
- **Explain:** Simple, beginner-friendly (<150 words)
- **MCQs:** Strict JSON format output
- **Summary:** Concise key points
- **Improve:** Better clarity and grammar

Includes guardrails to reduce hallucination.
```
⸻

### 🛠 Tech Stack
```bash
* React
* Node.js + Express
* Gemini API
```


## 👩‍💻 Author
```bash
Krisha Patel
MERN Stack Developer Intern Applicant
```
