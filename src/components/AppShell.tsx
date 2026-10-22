import { Link, useRouterState } from "@tanstack/react-router";
import { ModelSwitcher } from "@/components/ModelSwitcher";
import { useState, type ReactNode } from "react";
import { LayoutDashboard, Mail, ListChecks, BookOpenText, MessagesSquare, Menu, X, ShieldCheck } from "lucide-react";

export const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, color: "text-r5" },
  { to: "/email", label: "Email Generator", icon: Mail, color: "text-r1" },
  { to: "/planner", label: "Task Planner", icon: ListChecks, color: "text-r4" },
  { to: "/research", label: "Research Assistant", icon: BookOpenText, color: "text-r2" },
  { to: "/chat", label: "AI Chat", icon: MessagesSquare, color: "text-r6" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const activeLabel = NAV.find((n) => n.to === path)?.label ?? "Open Models";

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map((n) => {
        const active = path === n.to;
        return (
          <Link
            key={n.to}
            to={n.to}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <n.icon className={`h-4 w-4 ${n.color}`} />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );

  const brand = (
    <div className="flex items-center gap-2.5 px-2">
      <div className="h-8 w-8 rounded-lg bg-rainbow" />
      <div className="leading-tight">
        <div className="font-display text-sm font-bold">Workplace AI</div>
        <div className="text-xs text-muted-foreground">Productivity Assistant</div>
      </div>
    </div>
  );

  const footer = (
    <div className="rounded-xl border bg-secondary p-3 text-xs text-muted-foreground">
      <div className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-r4" /> Responsible AI
      </div>
      Outputs are drafts. Review for accuracy before sharing.
    </div>
  );

  return (
    <div className="flex min-h-screen w-full">
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-rainbow" />
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-6 border-r bg-card p-4 pt-6 lg:flex">
        {brand}
        {nav}
        <div className="mt-auto">{footer}</div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-72 flex-col gap-6 bg-card p-4 pt-6">
            <div className="flex items-center justify-between">
              {brand}
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            {nav}
            <div className="mt-auto">{footer}</div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="lg:hidden">{brand}</div>
          <span className="hidden text-sm font-semibold lg:block">{activeLabel}</span>
          <ModelSwitcher />
        </header>
        <main className="flex-1 p-4 pt-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
