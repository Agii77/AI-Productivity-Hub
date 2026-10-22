import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, EditableOutput, Field, GenerateButton, Input, PageHeader, Select, Textarea, fakeDelay } from "@/components/ui-kit";
import { emailPrompt, generateEmail, type EmailInput } from "@/lib/ai";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator · Workplace AI" },
      { name: "description", content: "Generate professional emails for any workplace situation." },
      { property: "og:title", content: "Smart Email Generator" },
      { property: "og:description", content: "Generate professional emails for any workplace situation." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [f, setF] = useState<EmailInput>({ type: "Follow-up", tone: "Formal", recipient: "", subject: "", points: "", sender: "", length: "Medium" });
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: keyof EmailInput) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Smart Email Generator" desc="Describe the situation — get a structured, ready-to-edit email." accent="bg-r1" />
      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <Card className="space-y-4 self-start">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email type"><Select value={f.type} onChange={set("type")} options={["Follow-up", "Meeting request", "Project update", "Thank you", "Complaint response", "Cold outreach", "Request"]} /></Field>
            <Field label="Tone"><Select value={f.tone} onChange={set("tone")} options={["Formal", "Friendly", "Persuasive", "Apologetic", "Concise"]} /></Field>
          </div>
          <Field label="Recipient"><Input value={f.recipient} onChange={set("recipient")} placeholder="e.g. Sarah Chen, Head of Ops" /></Field>
          <Field label="Subject (optional)"><Input value={f.subject} onChange={set("subject")} placeholder="Leave blank to auto-generate" /></Field>
          <Field label="Key points (one per line)"><Textarea rows={5} value={f.points} onChange={set("points")} placeholder={"Q3 report is ready\nNeed sign-off by Friday"} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Length"><Select value={f.length} onChange={set("length")} options={["Short", "Medium", "Detailed"]} /></Field>
            <Field label="Your name"><Input value={f.sender} onChange={set("sender")} /></Field>
          </div>
          <GenerateButton loading={loading} onClick={async () => { setLoading(true); await fakeDelay(); setOut(generateEmail(f)); setLoading(false); }} label="Generate email" />
        </Card>
        <EditableOutput value={out} onChange={setOut} prompt={emailPrompt(f)} filename="email.txt" />
      </div>
    </div>
  );
}
