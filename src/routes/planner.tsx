import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, EditableOutput, Field, GenerateButton, Input, PageHeader, Select, Textarea, fakeDelay } from "@/components/ui-kit";
import { generatePlan, planPrompt, type PlanInput } from "@/lib/ai";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner · Workplace AI" },
      { name: "description", content: "Transform goals and to-do lists into prioritised action plans." },
      { property: "og:title", content: "AI Task Planner" },
      { property: "og:description", content: "Transform goals and to-do lists into prioritised action plans." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const [f, setF] = useState<PlanInput>({ goal: "", deadline: "", hours: "4", method: "Priority levels", context: "" });
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: keyof PlanInput) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="AI Task Planner" desc="Paste a goal, project or messy to-do list. Get phases, priorities and next actions." accent="bg-r4" />
      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <Card className="space-y-4 self-start">
          <Field label="Goal or to-do list"><Textarea rows={7} value={f.goal} onChange={set("goal")} placeholder={"Launch the new onboarding flow\n— or —\nemail vendor\nupdate budget sheet\nprep slides"} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Deadline"><Input type="date" value={f.deadline} onChange={set("deadline")} /></Field>
            <Field label="Hours / day"><Select value={f.hours} onChange={set("hours")} options={["1", "2", "4", "6", "8"]} /></Field>
          </div>
          <Field label="Prioritisation"><Select value={f.method} onChange={set("method")} options={["Priority levels", "Eisenhower Matrix", "MoSCoW"]} /></Field>
          <Field label="Context (optional)"><Textarea rows={3} value={f.context} onChange={set("context")} placeholder="Team size, constraints, dependencies…" /></Field>
          <GenerateButton loading={loading} onClick={async () => { setLoading(true); await fakeDelay(); setOut(generatePlan(f)); setLoading(false); }} label="Build action plan" />
        </Card>
        <EditableOutput value={out} onChange={setOut} prompt={planPrompt(f)} filename="action-plan.txt" />
      </div>
    </div>
  );
}
