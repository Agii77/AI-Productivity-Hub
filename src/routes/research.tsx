import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, EditableOutput, Field, GenerateButton, Input, PageHeader, Select, Textarea, fakeDelay } from "@/components/ui-kit";
import { generateResearch, researchPrompt, type ResearchInput } from "@/lib/ai";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant · Workplace AI" },
      { name: "description", content: "Explore topics, organise notes and prepare structured reports." },
      { property: "og:title", content: "AI Research Assistant" },
      { property: "og:description", content: "Explore topics, organise notes and prepare structured reports." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [f, setF] = useState<ResearchInput>({ topic: "", questions: "", audience: "Executives", depth: "Overview", format: "Report", notes: "" });
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: keyof ResearchInput) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="AI Research Assistant" desc="Frame a topic, add your notes and generate a structured report outline." accent="bg-r2" />
      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <Card className="space-y-4 self-start">
          <Field label="Research topic"><Input value={f.topic} onChange={set("topic")} placeholder="e.g. Hybrid work and team productivity" /></Field>
          <Field label="Key questions (one per line)"><Textarea rows={4} value={f.questions} onChange={set("questions")} /></Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Audience"><Select value={f.audience} onChange={set("audience")} options={["Executives", "Team", "Clients", "Technical"]} /></Field>
            <Field label="Depth"><Select value={f.depth} onChange={set("depth")} options={["Overview", "Detailed", "Deep dive"]} /></Field>
            <Field label="Format"><Select value={f.format} onChange={set("format")} options={["Report", "Brief", "Comparison", "SWOT"]} /></Field>
          </div>
          <Field label="Source notes (optional)"><Textarea rows={5} value={f.notes} onChange={set("notes")} placeholder="Paste excerpts, links or notes…" /></Field>
          <GenerateButton loading={loading} onClick={async () => { setLoading(true); await fakeDelay(); setOut(generateResearch(f)); setLoading(false); }} label="Generate report" />
        </Card>
        <EditableOutput value={out} onChange={setOut} prompt={researchPrompt(f)} filename="research-report.txt" />
      </div>
    </div>
  );
}
