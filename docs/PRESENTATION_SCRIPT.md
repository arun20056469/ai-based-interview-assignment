# 3-Minute Presentation Script

## Timing Table

| Time | What to Speak |
| --- | --- |
| 0:00 - 0:30 | Self Introduction |
| 0:30 - 1:00 | Project Overview |
| 1:00 - 2:00 | Flow + Technical Decisions |
| 2:00 - 3:00 | Challenges + Demo + Conclusion |

## Full Speaking Script

### 0:00 - 0:30: Self Introduction

Good morning respected sir/madam. My name is Arun M. Today I am presenting my project titled **AI Mock Interview Platform**.

This project is built to help students and job seekers practice interviews before attending real placement or company interviews. The main idea is to create a simple, interactive platform where a candidate can answer interview questions and get instant feedback.

### 0:30 - 1:00: Project Overview

The AI Mock Interview Platform allows the user to choose an interview role such as Frontend Developer, Backend Developer, Data Analyst, or HR Interview. The user can also select the difficulty level and number of questions.

After the candidate answers each question, the system evaluates the response and gives a score out of 100. It also shows strengths, improvement points, a score trend chart, and a downloadable interview report.

### 1:00 - 2:00: Flow + Technical Decisions

The workflow starts with the candidate profile. The user enters their name, selects a role, chooses the difficulty, and enters the job focus area.

After clicking **Start Interview**, the system selects relevant questions from the question bank. The candidate can type the answer or use voice input if the browser supports speech recognition.

When the answer is submitted, the scoring engine checks four main areas: relevance, structure, evidence, and clarity. Relevance checks whether the answer matches the question. Structure checks whether the answer follows a proper flow like STAR. Evidence checks for examples, tools, metrics, or project details. Clarity checks whether the answer is concise and easy to understand.

For the tech stack, I used HTML for structure, CSS for responsive design, and JavaScript for the complete logic. I also used the Web Speech API for voice input, Canvas API for the score trend chart, and LocalStorage to save the session in the browser.

### 2:00 - 3:00: Challenges + Demo + Conclusion

One challenge was creating a scoring system without depending on an external AI API. To solve this, I built a local AI-style scoring engine using keywords, answer structure, examples, and clarity checks.

Another challenge was making the project easy to demo. So I made it run directly in the browser without npm installation or database setup.

Now I will quickly show the demo. First, I select the candidate role and difficulty. Then I click **Start Interview**. I answer a question and click **Submit Answer**. The system immediately shows the score, rubric breakdown, strengths, and improvement suggestions. Finally, I can download the interview report.

To conclude, this project is useful because it helps candidates improve interview performance through repeated practice and instant feedback. In the future, this can be expanded with real AI model integration, user login, database storage, video interview analysis, and mentor dashboards. Thank you.

## Demo Click Sequence

1. Open `index.html`.
2. Click **Load Demo** for a fast completed demo.
3. Show the score, strengths, improvement points, chart, and transcript.
4. Click **Reset Session** if you want to show the flow from the beginning.
5. Enter details and click **Start Interview**.
6. Type a short answer.
7. Click **Submit Answer**.
8. Click **Download Report**.

## Short Backup Explanation

If the evaluator asks whether this uses real AI, say:

This version uses a local AI-style scoring algorithm. It evaluates the answer based on relevance, structure, evidence, and clarity. It does not call an external AI API, so it is easy to demo and keeps candidate answers private. In future enhancement, the scoring module can be connected to a real AI model API for semantic evaluation.
