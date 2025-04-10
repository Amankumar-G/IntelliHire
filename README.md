# 🧠 AI-Powered Multi-Agent Job Screening System

## 🚀 Problem Statement 5: Enhancing Job Screening with AI and Data Intelligence

Manual job screening is often inefficient, time-consuming, and error-prone. This system aims to automate and optimize the recruitment process using a multi-agent LLM-based architecture and data intelligence techniques.

---

## 🎯 Objective

Develop a **multi-agent AI system** that:
- Reads and summarizes Job Descriptions (JDs)
- Extracts structured data from candidate CVs
- Matches qualifications with JDs using role-specific evaluators
- Shortlists candidates
- Sends automated interview invitations

---

## 🧱 Multi-Agent System Architecture

### 🟢 **Layer 1: Information Extraction Agents**
1. **JD Summarizer Agent**
   - Parses and summarizes job descriptions
   - Extracts key requirements: skills, qualifications, responsibilities

2. **CV Extractor Agent**
   - Extracts structured data from resumes
   - Key info: education, experience, certifications, soft/technical skills

---

### 🟡 **Layer 2: Role-Based Evaluation Agents**
These agents evaluate the match between JD and CV from different professional lenses:

1. **HR Agent**
   - Assesses communication skills, culture fit, and soft skills
   - Evaluates from a human resource perspective

2. **Technical Agent**
   - Matches technical stack, programming languages, frameworks
   - Evaluates domain-specific expertise

3. **Business Agent**
   - Evaluates business fit and general English proficiency
   - Checks alignment with business goals and client interaction needs

Each agent returns a **score out of 100** and an **explanation** for their evaluation.

---

### 🔵 **Layer 3: Final Decision Agent**
- Takes input from all three agents (HR, Tech, Business)
- Applies weighted logic to combine the results  
  Example:  
  `Final Score = 0.3 * HR + 0.5 * Tech + 0.2 * Business`
- If the final score ≥ 80%, the candidate is **shortlisted**
- Generates and sends **interview invitation emails** with scheduling details

---

## 💾 Tech Stack

| Component         | Technology              |
|------------------|--------------------------|
| Frontend          | React , Tailwind CSS     |
| Backend          | NodeJs , ExpressJs     |
| MultiAgents      | OpenAi , Langchain , Langgraph , Langamith  |
| DataBase        | SQLite   |
| Version Control     |Git , Github  |

---

## 🗃️ SQLite Database Structure

### `job_descriptions` Table
| id | title | summary | skills_required | created_at |

### `candidates` Table
| id | name | email | resume_text | extracted_skills | match_score | hr_score | tech_score | business_score | final_score | shortlisted (bool) |

### `interviews` Table
| id | candidate_id | date | time | interview_format | email_sent (bool) |

---

## ⚙️ Flowchart

```
+-------------------------+
|   Upload JD + CVs      |
+-------------------------+
           |
           v
+-------------------------+
| Layer 1: JD + CV Agents |
+-------------------------+
           |
           v
+-----------------------------+
| Layer 2: Evaluation Agents |
| (HR, Tech, Business)       |
+-----------------------------+
           |
           v
+-------------------------+
| Final Decision Agent    |
+-------------------------+
           |
   If final_score >= 80%
           |
           v
+-------------------------+
| Send Interview Email    |
+-------------------------+
```

---


## 📌 Key Features

- ✅ Automated JD & CV analysis
- ✅ Multi-role evaluation
- ✅ Scoring with explainability
- ✅ SQLite-based long-term memory
- ✅ Interview automation

---

## 🧠 Future Enhancements

- Resume parsing for multiple languages
- Adaptive weights for final decision agent
- Integration with Google Calendar for interview scheduling
- Admin dashboard to review candidate pipeline

---

## 🤝 Contributing

We welcome contributions! Please fork the repo and create a PR. Let's build smarter hiring together 💼🧠

---

## 👩‍💻 Team

- **Avaniben Kanjibhai Prajapati** 
- **Amankumar RobinBhai Galoliya**

---

