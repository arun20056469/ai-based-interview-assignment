# Workflow and Tech Stack Explanation

## Project Workflow

1. Candidate opens the application.
2. Candidate enters profile details.
3. Candidate selects role, difficulty, and question count.
4. Platform selects relevant questions from the question bank.
5. Candidate answers each question by typing or voice input.
6. Candidate submits the answer.
7. Scoring engine evaluates the answer using four rubrics.
8. Platform displays score, strengths, and improvement points.
9. Candidate moves to the next question.
10. At the end, candidate reviews transcript and downloads the report.

## System Workflow Diagram

```text
User Profile
    |
    v
Role + Difficulty Selection
    |
    v
Question Selection Engine
    |
    v
Interview Session
    |
    v
Typed / Voice Answer
    |
    v
AI-Style Scoring Engine
    |
    v
Feedback + Score Trend + Transcript
    |
    v
Downloadable Report
```

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Creates the structure of the app screens. |
| CSS3 | Builds the responsive and polished user interface. |
| JavaScript | Controls interview flow, scoring, storage, charts, and report generation. |
| Web Speech API | Converts spoken answer into text when supported by browser. |
| Canvas API | Draws the score trend chart. |
| LocalStorage | Saves interview progress in browser. |
| Markdown Report | Creates a downloadable final report. |

## Why This Stack Was Chosen

This project uses HTML, CSS, and JavaScript because it is easy to run, easy to demonstrate, and does not require installation. For a college or placement project demo, this is useful because the evaluator can open the project immediately.

The Web Speech API was selected to make the interview feel more realistic. The Canvas API was selected for visual analytics. LocalStorage was selected to preserve the session without needing a database.

## Technical Decisions

### 1. Browser-Based Application

The project is fully browser-based so it can be opened directly with `index.html`. This avoids setup issues during demonstration.

### 2. Local AI-Style Scoring

Instead of depending on an external API key, the scoring engine runs locally. It evaluates answer quality using relevance, structure, evidence, and clarity.

### 3. Modular JavaScript Files

The project separates question data and application logic:

- `data.js` stores role-based questions.
- `app.js` controls the user interface and scoring.

This makes the code easier to maintain and expand.

### 4. Responsive UI

The layout adapts to desktop and mobile screens. This improves usability and makes the project look complete.

### 5. Downloadable Report

The report download feature makes the project feel like a real product. Candidates can save their interview performance and improvement areas.

## Example Data Flow

```text
Candidate answer:
"In my React project, I used context to share session data..."

Scoring engine checks:
- Does it include expected keywords?
- Does it have structure?
- Does it include a project example or result?
- Is it clear and concise?

Output:
- Score: 86/100
- Strength: Good project evidence
- Improve Next: Add one measurable result
```
