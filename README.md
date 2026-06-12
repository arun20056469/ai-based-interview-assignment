# AI Mock Interview Platform

A complete browser-based project for practicing interviews with instant AI-style feedback. The platform lets a candidate choose a role, answer interview questions by typing or voice input, receive rubric-based scoring, and download a final report.

## How to Run

### Option 1: Open Directly

Open `index.html` in any modern browser.

### Option 2: Run With a Local Server

From this folder:

```powershell
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Main Features

- Candidate setup with role, difficulty, question count, and job focus.
- Question banks for Frontend Developer, Backend Developer, Data Analyst, and HR/General Interview.
- Typed answers and browser speech recognition support.
- AI-style scoring for relevance, structure, evidence, and clarity.
- Strengths and improvement suggestions after every answer.
- Score trend chart and interview transcript.
- Downloadable interview report in Markdown format.
- Local storage session recovery.
- Fully responsive layout for laptop and mobile screens.

## Folder Structure

```text
ai-mock-interview-platform/
  index.html
  README.md
  assets/
    css/
      styles.css
    js/
      app.js
      data.js
  docs/
    PRESENTATION_SCRIPT.md
    PROJECT_DOCUMENTATION.md
    WORKFLOW_AND_TECHSTACK.md
```

## Tech Stack

- HTML5 for page structure.
- CSS3 for responsive UI and visual styling.
- Vanilla JavaScript for interview logic, scoring, charts, storage, and report generation.
- Web Speech API for optional voice input.
- LocalStorage for preserving the session in the browser.
- Canvas API for the score trend chart.

## Notes

This project does not require npm, Node.js, a database, or an API key. The scoring engine runs locally in the browser, making the demo simple and privacy-friendly.
