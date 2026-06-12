window.InterviewData = {
  roles: [
    {
      id: "frontend",
      name: "Frontend Developer",
      description: "Assesses UI thinking, JavaScript, accessibility, state management, and API integration.",
      questions: {
        beginner: [
          {
            type: "Technical",
            text: "Explain the difference between HTML, CSS, and JavaScript in a web application.",
            hint: "Connect structure, styling, and behavior with a simple example.",
            keywords: ["html", "css", "javascript", "structure", "style", "behavior", "dom"],
            samplePoints: ["HTML defines page structure.", "CSS controls visual presentation.", "JavaScript adds dynamic behavior and DOM interaction."]
          },
          {
            type: "Technical",
            text: "What is the DOM, and why is it important for frontend development?",
            hint: "Mention browser representation and how scripts update the page.",
            keywords: ["dom", "document", "object", "model", "browser", "tree", "update"],
            samplePoints: ["DOM is the browser's object representation of the HTML document.", "JavaScript can read and update DOM nodes.", "Efficient DOM updates improve user experience."]
          },
          {
            type: "Project",
            text: "Describe one frontend project you built and your role in it.",
            hint: "Use STAR: situation, task, action, result.",
            keywords: ["project", "built", "responsive", "user", "feature", "result", "deployed"],
            samplePoints: ["State the project goal.", "Explain your specific contribution.", "Share the measurable or visible outcome."]
          },
          {
            type: "Behavioral",
            text: "How do you handle feedback on your UI design or code?",
            hint: "Show openness, iteration, and communication.",
            keywords: ["feedback", "review", "improve", "iterate", "communication", "user", "changes"],
            samplePoints: ["Listen to the feedback fully.", "Clarify the expected outcome.", "Make changes and validate with testing or review."]
          },
          {
            type: "Technical",
            text: "What does responsive design mean?",
            hint: "Talk about layout changes across screen sizes.",
            keywords: ["responsive", "mobile", "desktop", "media", "layout", "flex", "grid"],
            samplePoints: ["Responsive design adapts UI to different devices.", "Use flexible layouts, media queries, and scalable assets.", "Test across mobile and desktop widths."]
          },
          {
            type: "Technical",
            text: "How would you make a button accessible?",
            hint: "Mention keyboard, labels, contrast, and semantic elements.",
            keywords: ["accessible", "keyboard", "focus", "label", "contrast", "semantic", "button"],
            samplePoints: ["Use a real button element.", "Ensure visible focus and keyboard support.", "Provide clear label text and sufficient contrast."]
          }
        ],
        intermediate: [
          {
            type: "Technical",
            text: "How do you manage state in a frontend application?",
            hint: "Compare local component state, shared state, and server state.",
            keywords: ["state", "component", "props", "context", "store", "server", "cache"],
            samplePoints: ["Use local state for isolated UI behavior.", "Use shared state for cross-component data.", "Keep server data synchronized with API responses and cache invalidation."]
          },
          {
            type: "Technical",
            text: "Explain how you would fetch API data and handle loading, success, and error states.",
            hint: "Mention user experience and defensive coding.",
            keywords: ["api", "fetch", "loading", "error", "success", "async", "retry"],
            samplePoints: ["Show a loading state while request is pending.", "Render data only after success.", "Handle errors with helpful messages and retry options."]
          },
          {
            type: "Project",
            text: "Tell me about a bug you fixed in a frontend project.",
            hint: "Include how you found the root cause.",
            keywords: ["bug", "debug", "console", "root", "cause", "fix", "test"],
            samplePoints: ["Explain the symptom.", "Describe debugging steps.", "Mention the final fix and how you verified it."]
          },
          {
            type: "Technical",
            text: "What are the benefits of component-based UI development?",
            hint: "Discuss reuse, testing, and maintainability.",
            keywords: ["component", "reuse", "maintain", "test", "props", "isolate", "scalable"],
            samplePoints: ["Components make UI reusable.", "They isolate responsibilities and make testing easier.", "They help teams maintain a consistent design system."]
          },
          {
            type: "Behavioral",
            text: "How would you explain a technical delay to a non-technical stakeholder?",
            hint: "Show communication and ownership.",
            keywords: ["stakeholder", "communicate", "risk", "timeline", "impact", "solution", "update"],
            samplePoints: ["Explain the impact in business terms.", "Offer options and tradeoffs.", "Share a revised timeline and next update."]
          },
          {
            type: "Technical",
            text: "How do you improve frontend performance?",
            hint: "Mention assets, rendering, network, and measurement.",
            keywords: ["performance", "bundle", "lazy", "cache", "render", "image", "measure"],
            samplePoints: ["Measure first using performance tools.", "Reduce bundle and image size.", "Lazy load non-critical resources and avoid unnecessary rendering."]
          }
        ],
        advanced: [
          {
            type: "System Design",
            text: "Design a frontend architecture for an interview preparation platform with dashboards, live sessions, and reports.",
            hint: "Talk about modules, state, routing, data contracts, and reliability.",
            keywords: ["architecture", "routing", "state", "api", "dashboard", "reports", "modules"],
            samplePoints: ["Separate setup, session, feedback, and report modules.", "Use clear API contracts and predictable state.", "Add analytics, error handling, and accessibility from the start."]
          },
          {
            type: "Technical",
            text: "How would you prevent unnecessary re-renders in a large frontend application?",
            hint: "Mention state placement, memoization, and component boundaries.",
            keywords: ["render", "memo", "state", "props", "component", "performance", "profile"],
            samplePoints: ["Keep state close to where it is used.", "Memoize expensive calculations and stable callbacks.", "Use profiling tools before optimizing."]
          },
          {
            type: "Technical",
            text: "Explain how accessibility can be included in the development lifecycle instead of added at the end.",
            hint: "Mention design, implementation, testing, and review.",
            keywords: ["accessibility", "design", "semantic", "keyboard", "testing", "contrast", "screen"],
            samplePoints: ["Set accessibility rules in design components.", "Use semantic HTML and keyboard support during implementation.", "Test with automated tools and manual screen reader checks."]
          },
          {
            type: "Project",
            text: "Describe a frontend technical decision you made and the tradeoffs behind it.",
            hint: "Show reasoning, alternatives, and result.",
            keywords: ["decision", "tradeoff", "alternative", "reason", "impact", "result", "maintain"],
            samplePoints: ["Name the decision clearly.", "Compare alternatives and tradeoffs.", "Explain the final impact on maintainability or user experience."]
          },
          {
            type: "System Design",
            text: "How would you design a reusable design system for multiple web products?",
            hint: "Cover tokens, components, documentation, and governance.",
            keywords: ["design", "system", "tokens", "components", "documentation", "version", "accessibility"],
            samplePoints: ["Define tokens for color, spacing, typography.", "Build accessible reusable components.", "Version and document usage rules for teams."]
          },
          {
            type: "Technical",
            text: "How do you handle authentication state securely on the frontend?",
            hint: "Avoid exposing secrets and discuss token handling at a high level.",
            keywords: ["authentication", "token", "secure", "session", "storage", "csrf", "authorization"],
            samplePoints: ["Never store secrets in frontend code.", "Use secure server-managed sessions or carefully scoped tokens.", "Handle authorization checks on the backend as the source of truth."]
          }
        ]
      }
    },
    {
      id: "backend",
      name: "Backend Developer",
      description: "Assesses API design, databases, authentication, performance, and reliability.",
      questions: {
        beginner: [
          {
            type: "Technical",
            text: "What is an API, and how does a frontend application use it?",
            hint: "Explain request, response, endpoint, and data format.",
            keywords: ["api", "request", "response", "endpoint", "json", "server", "client"],
            samplePoints: ["API allows systems to communicate.", "Frontend sends requests to server endpoints.", "Server returns structured data like JSON."]
          },
          {
            type: "Technical",
            text: "Explain the difference between GET and POST requests.",
            hint: "Mention reading data versus creating or sending data.",
            keywords: ["get", "post", "read", "create", "request", "body", "http"],
            samplePoints: ["GET retrieves data.", "POST sends data to create or process something.", "POST usually carries a request body."]
          },
          {
            type: "Technical",
            text: "Why do we use databases in backend applications?",
            hint: "Talk about persistence, querying, and relationships.",
            keywords: ["database", "store", "persist", "query", "data", "relationship", "records"],
            samplePoints: ["Databases store data permanently.", "They support querying and filtering.", "They model relationships between entities."]
          },
          {
            type: "Project",
            text: "Tell me about a backend feature you built or would like to build.",
            hint: "Include data model and API behavior.",
            keywords: ["backend", "feature", "api", "database", "validation", "response", "result"],
            samplePoints: ["Explain the feature goal.", "Describe the API and data model.", "Mention validation and expected result."]
          },
          {
            type: "Behavioral",
            text: "How do you respond when your API has a production issue?",
            hint: "Show calm debugging and communication.",
            keywords: ["issue", "logs", "debug", "rollback", "monitor", "communicate", "fix"],
            samplePoints: ["Check logs and monitoring.", "Identify impact and communicate updates.", "Apply fix or rollback and verify."]
          },
          {
            type: "Technical",
            text: "What is input validation, and why is it important?",
            hint: "Mention reliability and security.",
            keywords: ["validation", "input", "security", "error", "sanitize", "rules", "protect"],
            samplePoints: ["Validation checks whether input follows expected rules.", "It prevents bad data and security issues.", "It gives users clear errors."]
          }
        ],
        intermediate: [
          {
            type: "Technical",
            text: "How would you design REST APIs for a mock interview platform?",
            hint: "Think about candidates, questions, sessions, answers, and reports.",
            keywords: ["rest", "api", "session", "candidate", "question", "answer", "report"],
            samplePoints: ["Define resources such as sessions, questions, answers, and reports.", "Use clear HTTP methods.", "Return consistent status codes and JSON responses."]
          },
          {
            type: "Technical",
            text: "How do you secure an API endpoint?",
            hint: "Mention authentication, authorization, validation, and rate limits.",
            keywords: ["secure", "authentication", "authorization", "validation", "rate", "token", "https"],
            samplePoints: ["Authenticate the user.", "Authorize access to the resource.", "Validate input, use HTTPS, and apply rate limits."]
          },
          {
            type: "Technical",
            text: "Explain indexing in a database and when you would use it.",
            hint: "Discuss faster reads and write/storage tradeoffs.",
            keywords: ["index", "database", "query", "performance", "read", "write", "tradeoff"],
            samplePoints: ["Indexes speed up reads for common query fields.", "They add storage and can slow writes.", "Use them based on query patterns."]
          },
          {
            type: "Project",
            text: "Describe how you would store interview answers and feedback in a database.",
            hint: "Mention tables or collections and relationships.",
            keywords: ["store", "answers", "feedback", "database", "schema", "session", "candidate"],
            samplePoints: ["Use sessions linked to candidates.", "Store each answer with question ID and score.", "Store feedback summary for reports."]
          },
          {
            type: "Technical",
            text: "How do you handle errors in backend services?",
            hint: "Mention validation errors, unexpected errors, logs, and status codes.",
            keywords: ["error", "status", "logs", "validation", "exception", "response", "monitor"],
            samplePoints: ["Return helpful client-safe error messages.", "Log technical details server-side.", "Use proper HTTP status codes and monitoring."]
          },
          {
            type: "System Design",
            text: "How would you make a backend service scalable during high interview traffic?",
            hint: "Cover stateless services, caching, queues, and database load.",
            keywords: ["scalable", "cache", "queue", "stateless", "database", "load", "horizontal"],
            samplePoints: ["Keep app servers stateless for horizontal scaling.", "Cache repeated reads.", "Use queues for heavy scoring jobs and optimize database access."]
          }
        ],
        advanced: [
          {
            type: "System Design",
            text: "Design the backend architecture for an AI mock interview platform.",
            hint: "Include API layer, scoring service, database, storage, and reporting.",
            keywords: ["architecture", "api", "scoring", "database", "storage", "report", "queue"],
            samplePoints: ["Separate API, scoring, persistence, and reporting services.", "Use queues for async evaluation.", "Store sessions, answers, scores, and generated reports."]
          },
          {
            type: "Technical",
            text: "How would you design idempotent APIs for answer submission?",
            hint: "Mention duplicate requests and unique request IDs.",
            keywords: ["idempotent", "duplicate", "request", "id", "retry", "submission", "consistent"],
            samplePoints: ["Use a unique submission ID.", "Return the same result for duplicate retries.", "Avoid creating duplicate answer rows."]
          },
          {
            type: "Technical",
            text: "Explain how you would monitor backend reliability.",
            hint: "Mention logs, metrics, traces, alerts, and SLAs.",
            keywords: ["monitor", "logs", "metrics", "traces", "alerts", "latency", "error"],
            samplePoints: ["Collect logs, metrics, and traces.", "Track latency, error rate, throughput, and saturation.", "Set alerts around user-impacting thresholds."]
          },
          {
            type: "System Design",
            text: "How would you handle long-running AI scoring tasks?",
            hint: "Discuss asynchronous processing.",
            keywords: ["async", "queue", "worker", "status", "retry", "timeout", "job"],
            samplePoints: ["Create a scoring job and return job status.", "Process in workers with retries and timeouts.", "Notify or let the frontend poll for completion."]
          },
          {
            type: "Technical",
            text: "How would you protect candidate interview data?",
            hint: "Mention privacy, encryption, access control, and retention.",
            keywords: ["privacy", "encryption", "access", "retention", "candidate", "secure", "audit"],
            samplePoints: ["Encrypt data in transit and at rest.", "Apply role-based access control.", "Define retention and audit policies."]
          },
          {
            type: "Project",
            text: "Describe a backend tradeoff between consistency and performance.",
            hint: "Use a concrete example.",
            keywords: ["consistency", "performance", "tradeoff", "cache", "database", "latency", "decision"],
            samplePoints: ["Name the scenario.", "Explain the consistency requirement.", "Describe the performance choice and its risk."]
          }
        ]
      }
    },
    {
      id: "data-analyst",
      name: "Data Analyst",
      description: "Assesses SQL, dashboards, business thinking, data cleaning, and insights communication.",
      questions: {
        beginner: [
          {
            type: "Technical",
            text: "What is the difference between rows and columns in a dataset?",
            hint: "Use a simple table example.",
            keywords: ["rows", "columns", "dataset", "record", "field", "table", "example"],
            samplePoints: ["Rows represent records or observations.", "Columns represent attributes or fields.", "Together they form a table for analysis."]
          },
          {
            type: "Technical",
            text: "Why is data cleaning important before analysis?",
            hint: "Mention missing values, duplicates, and accuracy.",
            keywords: ["cleaning", "missing", "duplicates", "accuracy", "quality", "analysis", "errors"],
            samplePoints: ["Cleaning improves data quality.", "It handles missing, duplicate, or inconsistent values.", "Better quality leads to more reliable insights."]
          },
          {
            type: "Technical",
            text: "Explain a simple SQL SELECT query.",
            hint: "Mention table, columns, filters, and result set.",
            keywords: ["sql", "select", "table", "columns", "where", "filter", "result"],
            samplePoints: ["SELECT chooses columns.", "FROM identifies the table.", "WHERE filters rows based on conditions."]
          },
          {
            type: "Project",
            text: "Describe a dashboard you would build for interview performance tracking.",
            hint: "Mention useful metrics and users.",
            keywords: ["dashboard", "metrics", "score", "trend", "candidate", "insights", "visual"],
            samplePoints: ["Track average score, topic gaps, and progress over time.", "Use charts for trends and breakdowns.", "Design for candidates and mentors."]
          },
          {
            type: "Behavioral",
            text: "How do you explain data insights to a non-technical audience?",
            hint: "Focus on clarity and business impact.",
            keywords: ["insights", "audience", "clear", "business", "impact", "visual", "recommend"],
            samplePoints: ["Start with the business question.", "Use simple visuals and plain language.", "End with an actionable recommendation."]
          },
          {
            type: "Technical",
            text: "What is a KPI?",
            hint: "Give an example from interview preparation.",
            keywords: ["kpi", "metric", "performance", "goal", "measure", "score", "progress"],
            samplePoints: ["KPI is a key performance indicator.", "It measures progress toward a goal.", "Example: average interview score or completion rate."]
          }
        ],
        intermediate: [
          {
            type: "Technical",
            text: "How would you analyze whether users are improving after multiple mock interviews?",
            hint: "Mention baseline, trend, segments, and metrics.",
            keywords: ["improving", "baseline", "trend", "segments", "metrics", "score", "compare"],
            samplePoints: ["Compare first session to later sessions.", "Track score trends and topic-specific improvement.", "Segment by role, difficulty, or practice frequency."]
          },
          {
            type: "Technical",
            text: "Explain INNER JOIN and LEFT JOIN with an example.",
            hint: "Use users and interview sessions.",
            keywords: ["join", "inner", "left", "users", "sessions", "matching", "records"],
            samplePoints: ["INNER JOIN returns matching rows from both tables.", "LEFT JOIN keeps all rows from the left table.", "Use LEFT JOIN to include users even without sessions."]
          },
          {
            type: "Project",
            text: "Describe how you would find the weakest interview topic for each candidate.",
            hint: "Mention grouping, averages, and ranking.",
            keywords: ["weakest", "topic", "candidate", "group", "average", "rank", "score"],
            samplePoints: ["Group scores by candidate and topic.", "Calculate average score per topic.", "Rank topics and identify the lowest area."]
          },
          {
            type: "Technical",
            text: "How do you handle outliers in analysis?",
            hint: "Mention investigation before removal.",
            keywords: ["outliers", "analysis", "investigate", "remove", "cap", "median", "impact"],
            samplePoints: ["Identify outliers using statistics or visual checks.", "Investigate whether they are errors or valid extremes.", "Decide to keep, cap, remove, or analyze separately."]
          },
          {
            type: "Behavioral",
            text: "Tell me about a time data changed your recommendation.",
            hint: "Use a real or realistic STAR example.",
            keywords: ["data", "recommendation", "changed", "evidence", "decision", "result", "stakeholder"],
            samplePoints: ["Explain the original assumption.", "Show what the data revealed.", "Describe the changed decision and result."]
          },
          {
            type: "Technical",
            text: "What chart would you use to compare interview scores across topics, and why?",
            hint: "Match chart type to comparison.",
            keywords: ["chart", "compare", "bar", "line", "topics", "trend", "visual"],
            samplePoints: ["Use a bar chart for topic comparison.", "Use a line chart for progress over time.", "Choose charts based on the question being answered."]
          }
        ],
        advanced: [
          {
            type: "Case Study",
            text: "You notice high session starts but low interview completion. How would you investigate?",
            hint: "Discuss funnel analysis and hypotheses.",
            keywords: ["funnel", "completion", "dropoff", "hypothesis", "segment", "metric", "investigate"],
            samplePoints: ["Map the funnel from start to completion.", "Find the highest drop-off step.", "Segment by device, role, difficulty, or time and propose experiments."]
          },
          {
            type: "Technical",
            text: "How would you define a success metric for this AI mock interview platform?",
            hint: "Balance engagement and learning outcomes.",
            keywords: ["success", "metric", "retention", "improvement", "completion", "outcome", "north"],
            samplePoints: ["Choose a north-star metric such as completed practice sessions with score improvement.", "Add guardrail metrics like retention and report quality.", "Tie metrics to learning outcomes."]
          },
          {
            type: "Technical",
            text: "Explain how cohort analysis could be useful for this product.",
            hint: "Mention user groups over time.",
            keywords: ["cohort", "retention", "time", "users", "behavior", "compare", "trend"],
            samplePoints: ["Group users by signup or first interview date.", "Track retention and improvement over time.", "Compare cohorts after product changes."]
          },
          {
            type: "Project",
            text: "Design an analytics dashboard for mentors reviewing many candidates.",
            hint: "Mention aggregate view and drill-down.",
            keywords: ["analytics", "dashboard", "mentor", "aggregate", "drill", "candidate", "priority"],
            samplePoints: ["Show overall candidate readiness distribution.", "Highlight candidates needing attention.", "Allow drill-down by candidate, role, and topic."]
          },
          {
            type: "Technical",
            text: "How would you validate that the AI scoring is fair across candidate groups?",
            hint: "Mention bias checks and human review.",
            keywords: ["fair", "bias", "groups", "validate", "human", "review", "metrics"],
            samplePoints: ["Compare scoring patterns across groups.", "Review false positives and false negatives.", "Use human review and rubric calibration."]
          },
          {
            type: "Case Study",
            text: "How would you estimate the business impact of adding voice input to interviews?",
            hint: "Discuss experiment design.",
            keywords: ["impact", "voice", "experiment", "ab", "metric", "completion", "engagement"],
            samplePoints: ["Run an A/B test with and without voice input.", "Measure completion rate, answer length, and satisfaction.", "Check whether the feature improves outcomes without harming accessibility."]
          }
        ]
      }
    },
    {
      id: "hr",
      name: "HR / General Interview",
      description: "Assesses communication, self-awareness, teamwork, conflict handling, and career motivation.",
      questions: {
        beginner: [
          {
            type: "Behavioral",
            text: "Tell me about yourself.",
            hint: "Keep it short: background, skills, project, and goal.",
            keywords: ["background", "skills", "project", "strength", "goal", "role", "learn"],
            samplePoints: ["Start with your education or role.", "Mention key skills and one project.", "End with why this opportunity fits your goal."]
          },
          {
            type: "Behavioral",
            text: "Why do you want this role?",
            hint: "Connect your skills with the company or role requirements.",
            keywords: ["role", "skills", "interest", "company", "learn", "contribute", "growth"],
            samplePoints: ["Show genuine interest in the role.", "Connect your skills to the work.", "Mention how you can contribute and grow."]
          },
          {
            type: "Behavioral",
            text: "What are your strengths?",
            hint: "Give one or two strengths with proof.",
            keywords: ["strength", "example", "communication", "problem", "team", "result", "learn"],
            samplePoints: ["Name a strength clearly.", "Support it with an example.", "Tie it to workplace value."]
          },
          {
            type: "Behavioral",
            text: "What is one area you are improving?",
            hint: "Be honest, but show action.",
            keywords: ["improve", "weakness", "practice", "feedback", "plan", "progress", "learn"],
            samplePoints: ["Choose a real but manageable area.", "Explain the steps you are taking.", "Share progress or a positive result."]
          },
          {
            type: "Behavioral",
            text: "How do you handle pressure?",
            hint: "Use a short example.",
            keywords: ["pressure", "prioritize", "calm", "deadline", "plan", "communicate", "result"],
            samplePoints: ["Prioritize urgent work.", "Break tasks into smaller steps.", "Communicate early and stay calm."]
          },
          {
            type: "Behavioral",
            text: "Where do you see yourself in three years?",
            hint: "Show ambition and realism.",
            keywords: ["three", "years", "growth", "skills", "responsibility", "contribute", "learn"],
            samplePoints: ["Mention skill growth.", "Show interest in taking responsibility.", "Align your goal with the role."]
          }
        ],
        intermediate: [
          {
            type: "Behavioral",
            text: "Tell me about a time you worked in a team.",
            hint: "Use STAR and include your contribution.",
            keywords: ["team", "collaborate", "role", "communication", "task", "result", "support"],
            samplePoints: ["Describe the team situation.", "Explain your responsibility.", "Share the result and what you learned."]
          },
          {
            type: "Behavioral",
            text: "Describe a challenge you faced during a project.",
            hint: "Focus on problem-solving.",
            keywords: ["challenge", "project", "problem", "action", "solution", "result", "learn"],
            samplePoints: ["State the challenge.", "Explain the action you took.", "Share the result and learning."]
          },
          {
            type: "Behavioral",
            text: "How do you handle conflict with a teammate?",
            hint: "Show maturity and communication.",
            keywords: ["conflict", "teammate", "listen", "understand", "communicate", "resolve", "respect"],
            samplePoints: ["Listen to understand the concern.", "Discuss facts and shared goals.", "Agree on a solution respectfully."]
          },
          {
            type: "Behavioral",
            text: "Tell me about a time you received feedback and improved.",
            hint: "Include action after feedback.",
            keywords: ["feedback", "improved", "action", "practice", "result", "learn", "mentor"],
            samplePoints: ["Explain the feedback.", "Describe the improvement plan.", "Share the visible result."]
          },
          {
            type: "Behavioral",
            text: "Why should we hire you?",
            hint: "Summarize skills, attitude, and fit.",
            keywords: ["hire", "skills", "project", "learn", "contribute", "fit", "value"],
            samplePoints: ["Mention relevant skills.", "Give proof from project or experience.", "Show eagerness to contribute and learn."]
          },
          {
            type: "Behavioral",
            text: "Describe your final year or recent project in simple terms.",
            hint: "Explain problem, solution, technology, and impact.",
            keywords: ["project", "problem", "solution", "technology", "impact", "user", "result"],
            samplePoints: ["Explain the problem clearly.", "Describe your solution and tech stack.", "Share the outcome or expected benefit."]
          }
        ],
        advanced: [
          {
            type: "Behavioral",
            text: "Tell me about a time you influenced a decision without authority.",
            hint: "Show evidence, communication, and trust.",
            keywords: ["influence", "decision", "evidence", "communication", "trust", "stakeholder", "result"],
            samplePoints: ["Describe the decision context.", "Explain how you used evidence and communication.", "Share the final outcome."]
          },
          {
            type: "Behavioral",
            text: "Describe a failure and what changed after it.",
            hint: "Take ownership and show learning.",
            keywords: ["failure", "ownership", "learned", "changed", "process", "result", "improved"],
            samplePoints: ["Own your part without blaming.", "Explain what you learned.", "Show the process or behavior change after it."]
          },
          {
            type: "Behavioral",
            text: "How do you prioritize when everything feels urgent?",
            hint: "Mention impact, deadline, dependencies, and communication.",
            keywords: ["prioritize", "urgent", "impact", "deadline", "dependency", "communicate", "plan"],
            samplePoints: ["Rank work by impact and deadline.", "Identify dependencies and blockers.", "Communicate tradeoffs and update stakeholders."]
          },
          {
            type: "Behavioral",
            text: "Tell me about a time you had to learn a new technology quickly.",
            hint: "Show learning strategy and result.",
            keywords: ["learn", "technology", "quickly", "practice", "documentation", "project", "result"],
            samplePoints: ["Explain why you needed to learn it.", "Describe your learning process.", "Share how you applied it successfully."]
          },
          {
            type: "Behavioral",
            text: "How would you handle an ethical concern in a project?",
            hint: "Mention transparency and escalation.",
            keywords: ["ethical", "concern", "privacy", "transparent", "escalate", "policy", "responsible"],
            samplePoints: ["Identify the concern clearly.", "Check policy and user impact.", "Raise it through the proper channel and propose a responsible fix."]
          },
          {
            type: "Behavioral",
            text: "How do you measure your own growth as a professional?",
            hint: "Use skills, feedback, outcomes, and consistency.",
            keywords: ["growth", "feedback", "skills", "outcomes", "goals", "measure", "reflect"],
            samplePoints: ["Set learning goals.", "Track outcomes and feedback.", "Reflect regularly and adjust the plan."]
          }
        ]
      }
    }
  ],
  rubric: [
    {
      id: "relevance",
      label: "Relevance",
      description: "Answer matches the question and includes expected concepts."
    },
    {
      id: "structure",
      label: "Structure",
      description: "Answer follows a clear flow such as STAR or problem-solution-result."
    },
    {
      id: "evidence",
      label: "Evidence",
      description: "Answer includes examples, metrics, tools, or concrete actions."
    },
    {
      id: "clarity",
      label: "Clarity",
      description: "Answer is concise, confident, and easy to understand."
    }
  ]
};
