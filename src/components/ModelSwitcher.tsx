import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, Cpu, Info } from "lucide-react";
import { MODELS, useModel } from "@/lib/model";

export function ModelSwitcher() {
  const { model, setModel } = useModel();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative ml-auto shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary"
      >
        <Cpu className={`h-3.5 w-3.5 ${model.tint}`} />
        <span className="hidden sm:inline">{model.short}</span>
        <span className="sm:hidden text-[11px] font-medium text-muted-foreground">Model</span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-xl border bg-card p-1.5 shadow-soft"
        >
          <div className="px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Open model
          </div>
          {MODELS.map((m) => {
            const active = m.id === model.id;
            return (
              <button
                key={m.id}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setModel(m.id);
                  setOpen(false);
                }}
                className={`flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-secondary ${
                  active ? "bg-secondary" : ""
                }`}
              >
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${m.bar}`} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-tight">{m.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{m.org} · {m.license}</span>
                </span>
                {active && <Check className="mt-1 h-4 w-4 shrink-0 text-r4" />}
              </button>
            );
          })}
          <div className="mt-1 border-t pt-1">
            <Link
              to="/models"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Info className="h-3.5 w-3.5" /> About open models
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
