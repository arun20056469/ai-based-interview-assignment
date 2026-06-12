(function () {
  "use strict";

  const data = window.InterviewData;
  const storageKey = "ai-mock-interview-platform-session";

  const state = {
    started: false,
    currentIndex: 0,
    startTime: null,
    timerId: null,
    profile: {},
    questions: [],
    answers: []
  };

  const elements = {
    setupForm: document.getElementById("setupForm"),
    candidateName: document.getElementById("candidateName"),
    roleSelect: document.getElementById("roleSelect"),
    difficultySelect: document.getElementById("difficultySelect"),
    questionCount: document.getElementById("questionCount"),
    jobFocus: document.getElementById("jobFocus"),
    answeredCount: document.getElementById("answeredCount"),
    averageScore: document.getElementById("averageScore"),
    readyScore: document.getElementById("readyScore"),
    questionNumber: document.getElementById("questionNumber"),
    timerDisplay: document.getElementById("timerDisplay"),
    progressBar: document.getElementById("progressBar"),
    roleBadge: document.getElementById("roleBadge"),
    difficultyBadge: document.getElementById("difficultyBadge"),
    questionTypeBadge: document.getElementById("questionTypeBadge"),
    questionText: document.getElementById("questionText"),
    questionHint: document.getElementById("questionHint"),
    answerInput: document.getElementById("answerInput"),
    voiceButton: document.getElementById("voiceButton"),
    voiceStatus: document.getElementById("voiceStatus"),
    previousButton: document.getElementById("previousButton"),
    sampleAnswerButton: document.getElementById("sampleAnswerButton"),
    submitAnswerButton: document.getElementById("submitAnswerButton"),
    nextButton: document.getElementById("nextButton"),
    loadDemoButton: document.getElementById("loadDemoButton"),
    downloadReportButton: document.getElementById("downloadReportButton"),
    resetButton: document.getElementById("resetButton"),
    overallScore: document.getElementById("overallScore"),
    scoreRing: document.getElementById("scoreRing"),
    rubricList: document.getElementById("rubricList"),
    rubricTemplate: document.getElementById("rubricTemplate"),
    strengthList: document.getElementById("strengthList"),
    improvementList: document.getElementById("improvementList"),
    scoreChart: document.getElementById("scoreChart"),
    historyList: document.getElementById("historyList")
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  let listening = false;

  function init() {
    populateRoles();
    setupSpeechRecognition();
    bindEvents();

    if (!restoreState()) {
      renderPreviewQuestion();
      renderRubric(null);
      drawScoreChart([]);
      updateControls();
    }
  }

  function populateRoles() {
    elements.roleSelect.innerHTML = data.roles
      .map((role) => `<option value="${role.id}">${escapeHtml(role.name)}</option>`)
      .join("");
  }

  function bindEvents() {
    elements.setupForm.addEventListener("submit", startInterview);
    elements.roleSelect.addEventListener("change", renderPreviewQuestion);
    elements.difficultySelect.addEventListener("change", renderPreviewQuestion);
    elements.questionCount.addEventListener("change", renderPreviewQuestion);
    elements.answerInput.addEventListener("input", persistDraftAnswer);
    elements.previousButton.addEventListener("click", () => moveQuestion(-1));
    elements.nextButton.addEventListener("click", () => moveQuestion(1));
    elements.submitAnswerButton.addEventListener("click", submitAnswer);
    elements.sampleAnswerButton.addEventListener("click", showSamplePoints);
    elements.loadDemoButton.addEventListener("click", loadDemo);
    elements.downloadReportButton.addEventListener("click", downloadReport);
    elements.resetButton.addEventListener("click", resetSession);
  }

  function setupSpeechRecognition() {
    if (!SpeechRecognition) {
      elements.voiceButton.disabled = true;
      elements.voiceStatus.textContent = "Voice input is not supported in this browser. Typed answers still work.";
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.addEventListener("result", (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript;
        if (event.results[index].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript.trim()) {
        const separator = elements.answerInput.value.trim() ? " " : "";
        elements.answerInput.value += `${separator}${finalTranscript.trim()}`;
        persistDraftAnswer();
      }

      elements.voiceStatus.textContent = interimTranscript.trim()
        ? `Listening: ${interimTranscript.trim()}`
        : "Voice captured. Keep speaking or stop when ready.";
    });

    recognition.addEventListener("end", () => {
      listening = false;
      elements.voiceButton.textContent = "Start Voice Input";
      elements.voiceStatus.textContent = "Voice input stopped.";
    });

    recognition.addEventListener("error", () => {
      listening = false;
      elements.voiceButton.textContent = "Start Voice Input";
      elements.voiceStatus.textContent = "Voice input could not start. You can continue by typing.";
    });

    elements.voiceButton.addEventListener("click", toggleVoiceInput);
  }

  function toggleVoiceInput() {
    if (!recognition) {
      return;
    }

    if (listening) {
      recognition.stop();
      return;
    }

    try {
      recognition.start();
      listening = true;
      elements.voiceButton.textContent = "Stop Voice Input";
      elements.voiceStatus.textContent = "Listening now. Speak clearly near your microphone.";
    } catch (error) {
      elements.voiceStatus.textContent = "Voice input is already starting. Please try again in a moment.";
    }
  }

  function startInterview(event) {
    if (event) {
      event.preventDefault();
    }

    const role = getSelectedRole();
    const difficulty = elements.difficultySelect.value;
    const count = Number(elements.questionCount.value);
    const focus = elements.jobFocus.value.trim();
    const questions = selectQuestions(role, difficulty, count, focus);

    state.started = true;
    state.currentIndex = 0;
    state.startTime = Date.now();
    state.profile = {
      candidateName: elements.candidateName.value.trim() || "Candidate",
      roleId: role.id,
      roleName: role.name,
      difficulty,
      questionCount: count,
      focus
    };
    state.questions = questions;
    state.answers = questions.map((question) => ({
      question,
      answer: "",
      feedback: null
    }));

    startTimer();
    renderCurrentQuestion();
    renderSummary();
    renderRubric(null);
    renderHistory();
    drawScoreChart([]);
    saveState();
    showToast("Interview started. Answer the first question when ready.");
  }

  function selectQuestions(role, difficulty, count, focus) {
    const pool = role.questions[difficulty] || role.questions.intermediate || [];
    const focusTokens = tokenize(focus).filter((word) => word.length > 3);

    return pool
      .map((question, index) => {
        const keywordText = `${question.text} ${question.hint} ${question.keywords.join(" ")}`;
        const score = focusTokens.reduce((total, token) => {
          return total + (keywordText.toLowerCase().includes(token) ? 1 : 0);
        }, 0);
        return { question, index, score };
      })
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, count)
      .map((item) => item.question);
  }

  function submitAnswer() {
    if (!state.started) {
      showToast("Start the interview before submitting an answer.");
      return;
    }

    persistDraftAnswer();
    const entry = state.answers[state.currentIndex];
    const answer = entry.answer.trim();

    if (answer.length < 20) {
      showToast("Add a little more detail before submitting. Aim for at least three clear sentences.");
      return;
    }

    entry.feedback = evaluateAnswer(entry.question, answer, state.profile.focus);
    renderCurrentFeedback(entry.feedback);
    renderSummary();
    renderHistory();
    drawScoreChart(getSubmittedScores());
    saveState();
    showToast("Answer evaluated. Review your strengths and next improvement point.");
  }

  function evaluateAnswer(question, answer, focus) {
    const tokens = tokenize(answer);
    const text = answer.toLowerCase();
    const wordCount = tokens.length;
    const sentences = answer.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length;
    const keywordHits = question.keywords.filter((keyword) => tokens.includes(keyword.toLowerCase())).length;
    const focusTokens = tokenize(focus).filter((word) => word.length > 3);
    const focusHits = focusTokens.filter((word) => text.includes(word)).length;

    const relevance = clamp(
      Math.round((keywordHits / Math.max(question.keywords.length, 1)) * 78 + Math.min(focusHits * 5, 18) + 8),
      0,
      100
    );

    const starWords = ["situation", "task", "action", "result"];
    const starHits = starWords.filter((word) => text.includes(word)).length;
    const connectorWords = ["first", "then", "because", "therefore", "finally", "so", "after", "next"];
    const connectorHits = connectorWords.filter((word) => tokens.includes(word)).length;
    const structure = clamp(Math.round(22 + starHits * 14 + connectorHits * 8 + Math.min(sentences * 5, 24)), 0, 100);

    const hasMetric = /\d+|percent|percentage|score|rate|time|users|seconds|minutes|hours|days/.test(text);
    const exampleWords = ["example", "project", "built", "created", "implemented", "designed", "improved", "tested", "deployed", "analyzed"];
    const exampleHits = exampleWords.filter((word) => tokens.includes(word)).length;
    const evidence = clamp(Math.round(18 + exampleHits * 10 + (hasMetric ? 22 : 0) + Math.min(wordCount / 3, 28)), 0, 100);

    const fillerWords = ["um", "uh", "basically", "actually", "like", "stuff", "things"];
    const fillerHits = fillerWords.filter((word) => tokens.includes(word)).length;
    const lengthScore = wordCount < 35 ? wordCount * 1.7 : wordCount <= 170 ? 85 : 72;
    const clarity = clamp(Math.round(lengthScore + Math.min(sentences * 2, 10) - fillerHits * 6), 0, 100);

    const score = Math.round(relevance * 0.35 + structure * 0.22 + evidence * 0.23 + clarity * 0.2);

    return {
      score,
      breakdown: { relevance, structure, evidence, clarity },
      strengths: buildStrengths({ relevance, structure, evidence, clarity, score, keywordHits, wordCount, question }),
      improvements: buildImprovements({ relevance, structure, evidence, clarity, wordCount, question }),
      submittedAt: new Date().toISOString()
    };
  }

  function buildStrengths(result) {
    const strengths = [];

    if (result.relevance >= 70) {
      strengths.push("Your answer stays relevant to the question and includes important role-related terms.");
    }

    if (result.structure >= 70) {
      strengths.push("The answer has a clear flow, making it easier for an interviewer to follow.");
    }

    if (result.evidence >= 70) {
      strengths.push("You included concrete actions, examples, or measurable details.");
    }

    if (result.clarity >= 75) {
      strengths.push("Your response is concise and confident without unnecessary filler.");
    }

    if (strengths.length === 0) {
      strengths.push("You made a start and provided enough content for the system to evaluate.");
    }

    if (result.score >= 85) {
      strengths.push("This is interview-ready with only minor polishing needed.");
    }

    return strengths.slice(0, 4);
  }

  function buildImprovements(result) {
    const improvements = [];

    if (result.relevance < 70) {
      improvements.push(`Include more concepts connected to this question, such as ${result.question.keywords.slice(0, 3).join(", ")}.`);
    }

    if (result.structure < 70) {
      improvements.push("Use the STAR format: situation, task, action, and result.");
    }

    if (result.evidence < 70) {
      improvements.push("Add one project example, tool name, metric, or measurable outcome.");
    }

    if (result.clarity < 70) {
      improvements.push("Keep the answer between 60 and 150 words with short, direct sentences.");
    }

    if (result.wordCount < 45) {
      improvements.push("Expand the answer with what you did, why you did it, and what changed after that.");
    }

    if (improvements.length === 0) {
      improvements.push("Add a stronger final sentence that connects your answer to the role you are applying for.");
    }

    return improvements.slice(0, 4);
  }

  function moveQuestion(direction) {
    if (!state.started) {
      return;
    }

    persistDraftAnswer();
    state.currentIndex = clamp(state.currentIndex + direction, 0, state.questions.length - 1);
    renderCurrentQuestion();
    saveState();
  }

  function persistDraftAnswer() {
    if (!state.started || !state.answers[state.currentIndex]) {
      return;
    }

    state.answers[state.currentIndex].answer = elements.answerInput.value;
    saveState();
  }

  function renderPreviewQuestion() {
    if (state.started) {
      return;
    }

    const role = getSelectedRole();
    const difficulty = elements.difficultySelect.value;
    const firstQuestion = role.questions[difficulty][0];

    elements.roleBadge.textContent = role.name;
    elements.difficultyBadge.textContent = titleCase(difficulty);
    elements.questionTypeBadge.textContent = firstQuestion.type;
    elements.questionNumber.textContent = "1";
    elements.questionText.textContent = firstQuestion.text;
    elements.questionHint.textContent = `${firstQuestion.hint} Start the interview to begin scoring.`;
    elements.answerInput.value = "";
    elements.progressBar.style.width = "0%";
    elements.answeredCount.textContent = "0";
    elements.averageScore.textContent = "0";
    elements.readyScore.textContent = "--";
    updateControls();
  }

  function renderCurrentQuestion() {
    const entry = state.answers[state.currentIndex];
    const question = entry.question;

    elements.roleBadge.textContent = state.profile.roleName;
    elements.difficultyBadge.textContent = titleCase(state.profile.difficulty);
    elements.questionTypeBadge.textContent = question.type;
    elements.questionNumber.textContent = String(state.currentIndex + 1);
    elements.questionText.textContent = question.text;
    elements.questionHint.textContent = question.hint;
    elements.answerInput.value = entry.answer;

    const progress = ((state.currentIndex + 1) / state.questions.length) * 100;
    elements.progressBar.style.width = `${progress}%`;

    if (entry.feedback) {
      renderCurrentFeedback(entry.feedback);
    } else {
      renderRubric(null);
      setList(elements.strengthList, ["Submit this answer to generate feedback."]);
      setList(elements.improvementList, ["Use a clear example, structure your answer, and include one result."]);
      updateScoreRing(getAverageScore());
    }

    updateControls();
  }

  function renderCurrentFeedback(feedback) {
    updateScoreRing(feedback.score);
    renderRubric(feedback.breakdown);
    setList(elements.strengthList, feedback.strengths);
    setList(elements.improvementList, feedback.improvements);
  }

  function renderRubric(breakdown) {
    elements.rubricList.innerHTML = "";

    data.rubric.forEach((item) => {
      const value = breakdown ? breakdown[item.id] : 0;
      const node = elements.rubricTemplate.content.cloneNode(true);
      node.querySelector("strong").textContent = item.label;
      node.querySelector("span").textContent = `${value}/100`;
      node.querySelector(".mini-track div").style.width = `${value}%`;
      elements.rubricList.appendChild(node);
    });
  }

  function renderSummary() {
    const submitted = state.answers.filter((entry) => entry.feedback);
    const average = getAverageScore();

    elements.answeredCount.textContent = String(submitted.length);
    elements.averageScore.textContent = String(average);
    elements.readyScore.textContent = getReadinessLabel(average, submitted.length);
  }

  function renderHistory() {
    const submitted = state.answers.filter((entry) => entry.feedback);

    if (!submitted.length) {
      elements.historyList.innerHTML = '<p class="empty-state">No answers submitted yet.</p>';
      return;
    }

    elements.historyList.innerHTML = submitted
      .map((entry, index) => {
        const answerSnippet = entry.answer.length > 260 ? `${entry.answer.slice(0, 260)}...` : entry.answer;
        return `
          <article class="history-item">
            <header>
              <strong>Q${index + 1}: ${escapeHtml(entry.question.type)}</strong>
              <strong>${entry.feedback.score}/100</strong>
            </header>
            <p><strong>Question:</strong> ${escapeHtml(entry.question.text)}</p>
            <p><strong>Answer:</strong> ${escapeHtml(answerSnippet)}</p>
            <p><strong>Next step:</strong> ${escapeHtml(entry.feedback.improvements[0])}</p>
          </article>
        `;
      })
      .join("");
  }

  function showSamplePoints() {
    const question = state.started
      ? state.answers[state.currentIndex].question
      : getSelectedRole().questions[elements.difficultySelect.value][0];

    updateScoreRing(state.started ? getAverageScore() : 0);
    renderRubric(null);
    setList(elements.strengthList, question.samplePoints);
    setList(elements.improvementList, [
      "Convert these points into your own words.",
      "Add one real project example or measurable result.",
      "Keep the final answer under two minutes."
    ]);
  }

  function loadDemo() {
    elements.candidateName.value = "Arun M";
    elements.roleSelect.value = "frontend";
    elements.difficultySelect.value = "intermediate";
    elements.questionCount.value = "5";
    elements.jobFocus.value = "React, JavaScript, API integration, communication, performance";

    startInterview();

    state.answers.forEach((entry, index) => {
      entry.answer = buildDemoAnswer(entry.question, index);
      entry.feedback = evaluateAnswer(entry.question, entry.answer, state.profile.focus);
    });

    state.currentIndex = 0;
    renderCurrentQuestion();
    renderSummary();
    renderHistory();
    drawScoreChart(getSubmittedScores());
    saveState();
    showToast("Demo session loaded with completed answers and feedback.");
  }

  function buildDemoAnswer(question, index) {
    const concepts = question.keywords.slice(0, 6).join(", ");
    const sample = question.samplePoints.join(" ");
    const improvementMetric = 18 + index * 4;

    return `Situation: In a recent practice project, I had to answer a ${question.type.toLowerCase()} problem related to ${concepts}. Task: My responsibility was to give a clear solution that matched the user need and project goal. Action: First, I identified the main concept, then I applied it in the project, tested the result, and communicated the decision clearly. ${sample} For example, I implemented this approach, reviewed the output, and improved the final result by ${improvementMetric} percent. Result: The answer became more structured, relevant, and easier for an interviewer to evaluate.`;
  }

  function downloadReport() {
    if (!state.started) {
      showToast("Start or load a demo interview before downloading a report.");
      return;
    }

    persistDraftAnswer();
    const report = buildMarkdownReport();
    const blob = new Blob([report], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = state.profile.candidateName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "candidate";

    link.href = url;
    link.download = `${safeName}-mock-interview-report.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function buildMarkdownReport() {
    const submitted = state.answers.filter((entry) => entry.feedback);
    const average = getAverageScore();
    const lines = [
      "# AI Mock Interview Report",
      "",
      `Candidate: ${state.profile.candidateName}`,
      `Role: ${state.profile.roleName}`,
      `Difficulty: ${titleCase(state.profile.difficulty)}`,
      `Focus: ${state.profile.focus || "General interview preparation"}`,
      `Average Score: ${average}/100`,
      `Readiness: ${getReadinessLabel(average, submitted.length)}`,
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "## Summary",
      "",
      `Answered ${submitted.length} out of ${state.questions.length} questions. The scoring engine evaluates relevance, structure, evidence, and clarity.`,
      ""
    ];

    state.answers.forEach((entry, index) => {
      lines.push(`## Question ${index + 1}`);
      lines.push("");
      lines.push(`Type: ${entry.question.type}`);
      lines.push(`Question: ${entry.question.text}`);
      lines.push("");
      lines.push("### Answer");
      lines.push("");
      lines.push(entry.answer.trim() || "Not answered.");
      lines.push("");

      if (entry.feedback) {
        lines.push(`Score: ${entry.feedback.score}/100`);
        lines.push("");
        lines.push("Breakdown:");
        Object.entries(entry.feedback.breakdown).forEach(([key, value]) => {
          lines.push(`- ${titleCase(key)}: ${value}/100`);
        });
        lines.push("");
        lines.push("Strengths:");
        entry.feedback.strengths.forEach((item) => lines.push(`- ${item}`));
        lines.push("");
        lines.push("Improve Next:");
        entry.feedback.improvements.forEach((item) => lines.push(`- ${item}`));
      } else {
        lines.push("Score: Not submitted.");
      }

      lines.push("");
    });

    return lines.join("\n");
  }

  function resetSession() {
    if (listening && recognition) {
      recognition.stop();
    }

    state.started = false;
    state.currentIndex = 0;
    state.startTime = null;
    state.profile = {};
    state.questions = [];
    state.answers = [];
    stopTimer();
    safeLocalStorage("remove", storageKey);
    renderPreviewQuestion();
    renderRubric(null);
    setList(elements.strengthList, ["Submit an answer to generate feedback."]);
    setList(elements.improvementList, ["Use the STAR method and include a measurable result."]);
    renderHistory();
    drawScoreChart([]);
    updateScoreRing(0);
    elements.timerDisplay.textContent = "00:00";
    showToast("Session reset.");
  }

  function startTimer() {
    stopTimer();
    updateTimer();
    state.timerId = window.setInterval(updateTimer, 1000);
  }

  function stopTimer() {
    if (state.timerId) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function updateTimer() {
    if (!state.startTime) {
      elements.timerDisplay.textContent = "00:00";
      return;
    }

    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, "0");
    const seconds = (elapsed % 60).toString().padStart(2, "0");
    elements.timerDisplay.textContent = `${minutes}:${seconds}`;
  }

  function updateControls() {
    const hasSession = state.started;
    elements.previousButton.disabled = !hasSession || state.currentIndex === 0;
    elements.nextButton.disabled = !hasSession || state.currentIndex >= state.questions.length - 1;
    elements.submitAnswerButton.disabled = !hasSession;
  }

  function updateScoreRing(score) {
    const safeScore = clamp(score || 0, 0, 100);
    elements.overallScore.textContent = String(safeScore);
    elements.scoreRing.style.background = `conic-gradient(var(--primary) ${safeScore * 3.6}deg, #dfecea 0deg)`;
  }

  function drawScoreChart(scores) {
    const canvas = elements.scoreChart;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const padding = 28;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fbfffe";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#d8e7e4";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i += 1) {
      const y = padding + ((height - padding * 2) / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#5d7072";
    ctx.font = "12px Inter, sans-serif";
    ctx.fillText("100", 4, padding + 4);
    ctx.fillText("0", 12, height - padding + 4);

    if (!scores.length) {
      ctx.fillStyle = "#5d7072";
      ctx.textAlign = "center";
      ctx.fillText("Submit answers to see score trend", width / 2, height / 2);
      ctx.textAlign = "start";
      return;
    }

    const points = scores.map((score, index) => {
      const x = scores.length === 1
        ? width / 2
        : padding + ((width - padding * 2) / (scores.length - 1)) * index;
      const y = height - padding - (score / 100) * (height - padding * 2);
      return { x, y, score };
    });

    ctx.strokeStyle = "#0f766e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    points.forEach((point, index) => {
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#0f766e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#172526";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(point.score), point.x, point.y - 12);
      ctx.fillText(`Q${index + 1}`, point.x, height - 8);
    });

    ctx.textAlign = "start";
  }

  function restoreState() {
    const stored = safeLocalStorage("get", storageKey);

    if (!stored) {
      return false;
    }

    try {
      const parsed = JSON.parse(stored);
      if (!parsed.started || !Array.isArray(parsed.answers) || !parsed.answers.length) {
        return false;
      }

      Object.assign(state, parsed, { timerId: null });
      elements.candidateName.value = state.profile.candidateName || "";
      elements.roleSelect.value = state.profile.roleId || data.roles[0].id;
      elements.difficultySelect.value = state.profile.difficulty || "intermediate";
      elements.questionCount.value = String(state.profile.questionCount || state.answers.length);
      elements.jobFocus.value = state.profile.focus || "";
      startTimer();
      renderCurrentQuestion();
      renderSummary();
      renderHistory();
      drawScoreChart(getSubmittedScores());
      return true;
    } catch (error) {
      safeLocalStorage("remove", storageKey);
      return false;
    }
  }

  function saveState() {
    if (!state.started) {
      return;
    }

    const snapshot = {
      started: state.started,
      currentIndex: state.currentIndex,
      startTime: state.startTime,
      profile: state.profile,
      questions: state.questions,
      answers: state.answers
    };

    safeLocalStorage("set", storageKey, JSON.stringify(snapshot));
  }

  function safeLocalStorage(action, key, value) {
    try {
      if (action === "get") {
        return window.localStorage.getItem(key);
      }

      if (action === "set") {
        window.localStorage.setItem(key, value);
      }

      if (action === "remove") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      return null;
    }

    return null;
  }

  function getSelectedRole() {
    return data.roles.find((role) => role.id === elements.roleSelect.value) || data.roles[0];
  }

  function getSubmittedScores() {
    return state.answers
      .filter((entry) => entry.feedback)
      .map((entry) => entry.feedback.score);
  }

  function getAverageScore() {
    const scores = getSubmittedScores();

    if (!scores.length) {
      return 0;
    }

    return Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);
  }

  function getReadinessLabel(score, submittedCount) {
    if (!submittedCount) {
      return "--";
    }

    if (score >= 85) {
      return "Ready";
    }

    if (score >= 70) {
      return "Close";
    }

    if (score >= 55) {
      return "Practice";
    }

    return "Build";
  }

  function setList(target, items) {
    target.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function showToast(message) {
    const existing = document.querySelector(".toast");
    if (existing) {
      existing.remove();
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    window.setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  function tokenize(value) {
    return (value || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  }

  function titleCase(value) {
    return String(value)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  init();
})();
