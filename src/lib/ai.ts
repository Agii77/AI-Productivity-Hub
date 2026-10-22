// Local, template-based "AI" engine (no backend). Each tool builds a structured
// prompt (shown to the user) and a deterministic draft from it.

const lines = (s: string) => s.split(/\n|;|,(?=\s)/).map((l) => l.trim()).filter(Boolean);

export type EmailInput = { type: string; tone: string; recipient: string; subject: string; points: string; sender: string; length: string };

export function emailPrompt(i: EmailInput) {
  return `ROLE: Professional business communication writer.
TASK: Write a ${i.type.toLowerCase()} email.
TONE: ${i.tone}
LENGTH: ${i.length}
RECIPIENT: ${i.recipient || "Unspecified"}
SUBJECT: ${i.subject || "Generate a suitable subject"}
KEY POINTS:
${lines(i.points).map((p) => `- ${p}`).join("\n") || "- (none provided)"}
CONSTRAINTS: Clear subject line, greeting, concise body, specific call to action, sign-off from ${i.sender || "sender"}.`;
}

const openers: Record<string, string> = {
  Formal: "I hope this message finds you well.",
  Friendly: "Hope you're having a great week!",
  Persuasive: "I wanted to share an opportunity I believe is worth your attention.",
  Apologetic: "Please accept my sincere apologies for the inconvenience.",
  Concise: "",
};
const closers: Record<string, string> = {
  "Follow-up": "Could you let me know a convenient time to reconnect?",
  "Meeting request": "Would any time later this week work for a 30-minute call?",
  "Project update": "Please let me know if you have any questions or feedback.",
  "Thank you": "Thank you again — it is genuinely appreciated.",
  "Complaint response": "We are committed to resolving this and will keep you updated.",
  "Cold outreach": "Would you be open to a short call to explore this further?",
  "Request": "I'd be grateful if you could confirm by the end of the week.",
};

export function generateEmail(i: EmailInput) {
  const pts = lines(i.points);
  const name = i.recipient.split(/\s|,/)[0] || "there";
  const greet = i.tone === "Formal" ? `Dear ${i.recipient || "Sir/Madam"},` : `Hi ${name},`;
  const subject = i.subject || `${i.type}${pts[0] ? `: ${pts[0]}` : ""}`;
  const body = pts.length
    ? (i.length === "Short" ? pts.slice(0, 2) : pts).map((p) => (i.length === "Detailed" ? `• ${p[0].toUpperCase() + p.slice(1)}. I'm happy to provide further context on this point.` : `• ${p[0].toUpperCase() + p.slice(1)}`)).join("\n")
    : "• [Add your key points here]";
  const sign = i.tone === "Formal" ? "Kind regards," : "Best,";
  return `Subject: ${subject}

${greet}

${openers[i.tone] ? openers[i.tone] + "\n\n" : ""}I'm reaching out regarding ${subject.toLowerCase()}. Here are the key points:

${body}

${closers[i.type] ?? "Looking forward to your reply."}

${sign}
${i.sender || "[Your name]"}`;
}

export type PlanInput = { goal: string; deadline: string; hours: string; method: string; context: string };

export function planPrompt(i: PlanInput) {
  return `ROLE: Senior project manager and productivity coach.
TASK: Convert the goal/to-do list into an actionable plan.
GOAL / INPUT:
${i.goal || "(empty)"}
DEADLINE: ${i.deadline || "Flexible"}
AVAILABLE HOURS PER DAY: ${i.hours}
PRIORITISATION METHOD: ${i.method}
CONTEXT: ${i.context || "None"}
OUTPUT: Phases, prioritised tasks with estimates, milestones, risks, next 3 actions.`;
}

export function generatePlan(i: PlanInput) {
  const items = lines(i.goal);
  const tasks = items.length > 1 ? items : ["Clarify scope and success criteria", `Research requirements for: ${items[0] ?? "the goal"}`, "Draft first version", "Review with stakeholders", "Refine and finalise", "Deliver and retrospect"];
  const pri = i.method === "Eisenhower Matrix" ? ["Do first", "Schedule", "Delegate", "Eliminate"] : i.method === "MoSCoW" ? ["Must", "Should", "Could", "Won't"] : ["High", "Medium", "Low"];
  const rows = tasks.map((t, n) => `${n + 1}. [ ] ${t[0].toUpperCase() + t.slice(1)}\n     Priority: ${pri[Math.min(Math.floor((n / tasks.length) * pri.length), pri.length - 1)]} · Est: ${1 + (n % 3)}h`);
  const third = Math.ceil(rows.length / 3);
  return `ACTION PLAN — ${items.length > 1 ? "Task list" : items[0] ?? "Your goal"}
Deadline: ${i.deadline || "Flexible"} · Capacity: ${i.hours}h/day · Method: ${i.method}

PHASE 1 — Prepare
${rows.slice(0, third).join("\n")}

PHASE 2 — Execute
${rows.slice(third, third * 2).join("\n") || "     (no tasks)"}

PHASE 3 — Review & Deliver
${rows.slice(third * 2).join("\n") || "     (no tasks)"}

MILESTONES
• End of Phase 1: scope confirmed
• End of Phase 2: working draft complete
• Deadline: final delivery

RISKS & MITIGATION
• Scope creep → lock requirements after Phase 1
• Limited time → time-block ${i.hours}h daily, protect focus hours

NEXT 3 ACTIONS
→ ${tasks[0]}
→ ${tasks[1] ?? "Block time in calendar"}
→ ${tasks[2] ?? "Share plan with stakeholders"}`;
}

export type ResearchInput = { topic: string; questions: string; audience: string; depth: string; format: string; notes: string };

export function researchPrompt(i: ResearchInput) {
  return `ROLE: Professional research analyst.
TOPIC: ${i.topic || "(empty)"}
KEY QUESTIONS:
${lines(i.questions).map((q) => `- ${q}`).join("\n") || "- Generate key questions"}
AUDIENCE: ${i.audience}
DEPTH: ${i.depth}
OUTPUT FORMAT: ${i.format}
SOURCE NOTES: ${i.notes ? i.notes.slice(0, 300) + (i.notes.length > 300 ? "…" : "") : "None"}
RULES: Separate facts from assumptions, flag items needing verification, cite sources where provided.`;
}

export function generateResearch(i: ResearchInput) {
  const t = i.topic || "Untitled topic";
  const qs = lines(i.questions);
  const qList = qs.length ? qs : [`What is the current state of ${t}?`, `What are the main opportunities and challenges?`, `What should ${i.audience.toLowerCase()} do next?`];
  const notes = i.notes ? lines(i.notes).slice(0, 6) : [];
  return `${i.format.toUpperCase()}: ${t}
Audience: ${i.audience} · Depth: ${i.depth}

1. EXECUTIVE SUMMARY
This ${i.format.toLowerCase()} explores ${t}, outlining context, key findings and recommended next steps for ${i.audience.toLowerCase()}.

2. KEY QUESTIONS
${qList.map((q, n) => `${n + 1}. ${q}`).join("\n")}

3. FINDINGS
${qList.map((q, n) => `3.${n + 1} ${q}\n   • Finding: [Summarise evidence here] ⚠ verify\n   • Implication: [What this means for the audience]`).join("\n")}

4. SOURCE INSIGHTS
${notes.length ? notes.map((s) => `• ${s}`).join("\n") : "• No source notes provided — paste notes to extract insights."}

5. OPPORTUNITIES & RISKS
• Opportunity: [identify]
• Risk: [identify] — mitigation: [plan]

6. RECOMMENDATIONS
• Short term (0–3 months): …
• Medium term (3–12 months): …

7. FURTHER RESEARCH
• Validate findings marked ⚠ with primary sources.`;
}

export function chatReply(msg: string, sources: { name: string; text: string }[]) {
  const words = msg.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  const hits: string[] = [];
  for (const s of sources) {
    for (const sent of s.text.split(/(?<=[.!?])\s+/)) {
      if (words.some((w) => sent.toLowerCase().includes(w))) hits.push(`“${sent.trim().slice(0, 220)}” — ${s.name}`);
      if (hits.length >= 3) break;
    }
  }
  const lower = msg.toLowerCase();
  let core = "";
  if (/brainstorm|ideas?/.test(lower)) core = "Here are some ideas to get started:\n1. Reframe the problem from the customer's view\n2. Look at what adjacent teams do well\n3. Run a quick 15-minute experiment\n4. Remove one step from the current process\n5. Ask: what would make this 10× simpler?";
  else if (/write|draft|rewrite/.test(lower)) core = "Here's a structure you can use:\n• Opening: state the purpose in one sentence\n• Body: 2–3 key points, each with evidence\n• Close: a clear next step or ask\n\nShare your draft and I'll suggest edits.";
  else if (/problem|issue|stuck|fix/.test(lower)) core = "Let's break it down:\n1. Define the problem precisely\n2. List likely root causes\n3. Pick the cheapest test to confirm one\n4. Decide, act, and review the outcome";
  else core = `Good question. A practical approach to "${msg.slice(0, 80)}":\n• Clarify the desired outcome\n• Identify constraints and stakeholders\n• Choose the smallest next action you can take today`;
  return (hits.length ? `From your sources:\n${hits.map((h) => `• ${h}`).join("\n")}\n\n` : sources.length ? "I couldn't find a direct match in your sources.\n\n" : "") + core;
}
