# 🧠 MERN Stack Quiz Application

A full-stack, secure online quiz solving platform built using the **MERN** (MongoDB, Express, React, Node.js) stack. Developed as part of an academic project during the **Erasmus+ Exchange Program** at the **University of Maribor**.

---

## ✨ Features

### 🔒 Core Security & Anti-Cheat Mechanisms
- **Server-Side Validation:** Question grading and score calculations occur strictly on the backend to prevent client-side tampering.
- **Server-Side Time Tracking:** Time spent on each question is measured using server sessions (timestamp recorded when answer is sent vs. when response is received).
- **Data Protection:** Correct answer keys are never sent to the frontend payload.

### 🎯 Quiz Dynamics & Mathematical Scoring
- **Dynamic Question Selection:** 10 random questions selected from an Open Trivia API database upon starting a session.
- **Custom Mathematical Score Engine:** Scores are calculated per question using the exponential decay formula:
  
  $$Score = n \cdot e^{-k \cdot t}$$
  
  *Where:*
  - $n = 100 \cdot \text{grade}$ ($\text{grade} \in [0, 1]$ based on answer correctness)
  - $k = 0.2$ (time decay coefficient)
  - $t = \text{time in seconds}$
  - $e \approx 2.71828$ (Euler's number)

### 🚀 Additional Capabilities
- **User Authentication:** Registration and login system.
- **Leaderboards & History:** Global scoreboard displaying top user scores and personal attempt histories.
- **Responsive UI:** Modern, clean, and mobile-friendly user interface built with React.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML5, CSS3 / Modern UI Components, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ORM (`v6.9.0`)
- **API Integration:** Open Trivia Database API

---

## 📁 Project Structure

```text
mern-quiz-app/
├── backend/
│   ├── bin/             # Server entry point setup (www)
│   ├── controllers/     # Business logic & scoring handlers
│   ├── models/          # Mongoose database schemas (User, Question, History)
│   ├── routes/          # Express API endpoints
│   ├── app.js           # Express app setup & middleware
│   └── package.json
└── frontend/
    ├── public/          # Static public assets
    ├── src/             # React views, components & logic
    ├── index.html       # Vite entry HTML
    ├── vite.config.js   # Vite configuration
    └── package.json

Markdown
## 📸 Screenshots

<table>
  <tr>
    <td align="center"><strong>Landing Page</strong></td>
    <td align="center"><strong>Sign In Page</strong></td>
  </tr>
  <tr>
    <td><img src="./screenshots/01_landing.jpg" width="400" alt="Landing Page"></td>
    <td><img src="./screenshots/02_login.jpg" width="400" alt="Sign In Page"></td>
  </tr>
  <tr>
    <td align="center"><strong>Create Account</strong></td>
    <td align="center"><strong>User Profile</strong></td>
  </tr>
  <tr>
    <td><img src="./screenshots/03_register.jpg" width="400" alt="Register Page"></td>
    <td><img src="./screenshots/04_profile.jpg" width="400" alt="User Profile"></td>
  </tr>
  <tr>
    <td align="center"><strong>Quiz Start (Light Theme)</strong></td>
    <td align="center"><strong>Quiz Start (Dark Theme)</strong></td>
  </tr>
  <tr>
    <td><img src="./screenshots/05_quiz_light.jpg" width="400" alt="Quiz Light Theme"></td>
    <td><img src="./screenshots/06_quiz_dark.jpg" width="400" alt="Quiz Dark Theme"></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><strong>Global Leaderboard</strong></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="./screenshots/07_leaderboard.jpg" width="600" alt="Global Leaderboard"></td>
  </tr>
</table>
