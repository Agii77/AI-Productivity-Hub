import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, ListChecks, BookOpenText, MessagesSquare } from "lucide-react";
import { Card, Disclaimer } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · AI Workplace Productivity Assistant" },
      { name: "description", content: "Automate emails, planning, research and workplace questions with AI." },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      { property: "og:description", content: "Automate emails, planning, research and workplace questions with AI." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  { to: "/email", title: "Smart Email Generator", desc: "Draft polished emails for any professional situation.", icon: Mail, bar: "bg-r1", tint: "text-r1" },
  { to: "/planner", title: "AI Task Planner", desc: "Turn goals and messy to-dos into phased action plans.", icon: ListChecks, bar: "bg-r4", tint: "text-r4" },
  { to: "/research", title: "AI Research Assistant", desc: "Structure topics, notes and sources into reports.", icon: BookOpenText, bar: "bg-r2", tint: "text-r2" },
  { to: "/chat", title: "AI Chatbot", desc: "Brainstorm and solve problems using your own files.", icon: MessagesSquare, bar: "bg-r6", tint: "text-r6" },
] as const;

function Dashboard() {
  const hour = new Date().getHours();
  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden rounded-3xl border bg-card p-8 shadow-soft md:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rainbow opacity-20 blur-3xl" />
        <p className="text-sm font-medium text-muted-foreground">{hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"} 👋</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold md:text-5xl">
          Work smarter with your <span className="text-rainbow">AI productivity</span> assistant
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Four focused workspaces with structured prompts and fully editable outputs.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md sm:grid-cols-3">
          {[["4", "AI workspaces"], ["100%", "Editable drafts"], ["0", "Data leaves device"]].map(([v, l]) => (
            <div key={l} className="rounded-xl border bg-background p-3">
              <div className="font-display text-xl font-bold">{v}</div>
              <div className="text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group">
            <Card className="relative h-full overflow-hidden transition-transform group-hover:-translate-y-0.5">
              <div className={`absolute inset-x-0 top-0 h-1 ${t.bar}`} />
              <t.icon className={`h-6 w-6 ${t.tint}`} />
              <h2 className="mt-3 text-lg font-semibold">{t.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-6">
        <h2 className="font-semibold">Responsible AI</h2>
        <Disclaimer />
      </Card>
    </div>
  );
}
