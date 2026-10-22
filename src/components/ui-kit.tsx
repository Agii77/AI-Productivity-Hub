import { useState, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { Copy, Check, Info, Loader2, Wand2, Download } from "lucide-react";

export function PageHeader({ title, desc, accent }: { title: string; desc: string; accent: string }) {
  return (
    <div className="mb-6">
      <div className={`mb-2 h-1 w-12 rounded-full ${accent}`} />
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-card p-5 shadow-soft ${className}`}>{children}</div>;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const base = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";
export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={`${base} ${p.className ?? ""}`} />;
export const Textarea = (p: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...p} className={`${base} ${p.className ?? ""}`} />;
export const Select = ({ options, ...p }: SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) => (
  <select {...p} className={base}>
    {options.map((o) => <option key={o}>{o}</option>)}
  </select>
);

export function GenerateButton({ loading, onClick, label = "Generate" }: { loading: boolean; onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
      {loading ? "Generating…" : label}
    </button>
  );
}

export function EditableOutput({ value, onChange, prompt, filename }: { value: string; onChange: (v: string) => void; prompt?: string; filename: string }) {
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const download = () => {
    const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Output <span className="font-normal text-muted-foreground">· editable</span></h2>
        <div className="flex gap-2">
          {prompt && (
            <button onClick={() => setShowPrompt((s) => !s)} className="rounded-md border px-2.5 py-1 text-xs hover:bg-secondary">
              {showPrompt ? "Hide" : "View"} prompt
            </button>
          )}
          <button disabled={!value} onClick={download} className="rounded-md border px-2.5 py-1 text-xs hover:bg-secondary disabled:opacity-50"><Download className="inline h-3 w-3" /> Export</button>
          <button
            disabled={!value}
            onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className="rounded-md border px-2.5 py-1 text-xs hover:bg-secondary disabled:opacity-50"
          >
            {copied ? <Check className="inline h-3 w-3" /> : <Copy className="inline h-3 w-3" />} Copy
          </button>
        </div>
      </div>
      {showPrompt && prompt && (
        <pre className="mb-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-secondary p-3 text-xs text-muted-foreground">{prompt}</pre>
      )}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your AI-generated draft will appear here. Edit it freely."
        className="min-h-[420px] flex-1 font-mono text-[13px] leading-relaxed"
      />
      <Disclaimer />
    </Card>
  );
}

export function Disclaimer() {
  return (
    <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-r5" />
      AI-generated content may be inaccurate or incomplete. Verify facts, avoid sharing confidential data, and apply your own judgement before use.
    </p>
  );
}

export const fakeDelay = () => new Promise((r) => setTimeout(r, 700 + Math.random() * 500));
