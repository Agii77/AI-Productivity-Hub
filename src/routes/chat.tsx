import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { Send, Upload, FileText, Trash2, Bot, Pencil, Check } from "lucide-react";
import { Card, Disclaimer, PageHeader, Textarea, fakeDelay } from "@/components/ui-kit";
import { chatReply } from "@/lib/ai";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat · Workplace AI" },
      { name: "description", content: "Chat about workplace questions using your own files as knowledge sources." },
      { property: "og:title", content: "AI Workplace Chat" },
      { property: "og:description", content: "Chat about workplace questions using your own files as knowledge sources." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; text: string };
type Source = { name: string; size: number; text: string };
const starters = ["Brainstorm ideas to improve team meetings", "Help me write a project kickoff note", "I'm stuck prioritising two urgent projects"];

function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", text: "Hi! I'm your workplace assistant. Ask a question, or upload files on the right to use as knowledge sources." }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy]);

  const send = async (text = input) => {
    if (!text.trim() || busy) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput(""); setBusy(true);
    await fakeDelay();
    setMsgs((m) => [...m, { role: "assistant", text: chatReply(text, sources) }]);
    setBusy(false);
  };

  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    const added = await Promise.all([...files].map(async (f) => ({
      name: f.name, size: f.size,
      text: /\.(txt|md|csv|json|html?)$/i.test(f.name) || f.type.startsWith("text/") ? await f.text() : "",
    })));
    setSources((s) => [...s, ...added]);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="AI Chat" desc="Ask questions, brainstorm and solve problems — grounded in your uploaded sources." accent="bg-r6" />
      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <Card className="flex h-[70vh] flex-col p-0">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {msgs.map((m, i) => m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">{m.text}</div>
              </div>
            ) : (
              <div key={i} className="group flex gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rainbow"><Bot className="h-4 w-4 text-primary-foreground" /></div>
                <div className="min-w-0 flex-1">
                  {editing === i ? (
                    <Textarea rows={6} value={m.text} onChange={(e) => setMsgs((all) => all.map((x, j) => j === i ? { ...x, text: e.target.value } : x))} />
                  ) : (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.text}</div>
                  )}
                  {i > 0 && (
                    <button onClick={() => setEditing(editing === i ? null : i)} className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100">
                      {editing === i ? <><Check className="h-3 w-3" /> Done</> : <><Pencil className="h-3 w-3" /> Edit</>}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {busy && <div className="pl-10 text-sm text-muted-foreground animate-pulse">Thinking…</div>}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pl-10">
                {starters.map((s) => <button key={s} onClick={() => send(s)} className="rounded-full border px-3 py-1.5 text-xs hover:bg-secondary">{s}</button>)}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="border-t p-3">
            <div className="flex items-end gap-2">
              <Textarea rows={2} value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask anything about work…" className="resize-none" />
              <button onClick={() => send()} disabled={busy || !input.trim()} aria-label="Send" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h2 className="text-sm font-semibold">Knowledge sources</h2>
            <p className="mt-1 text-xs text-muted-foreground">Files stay in your browser. Text files (.txt, .md, .csv, .json) are searched for answers.</p>
            <label className="mt-3 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-5 text-center text-xs text-muted-foreground hover:bg-secondary"
              onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}>
              <Upload className="h-5 w-5 text-r5" />
              Drop files or click to upload
              <input type="file" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
            </label>
            <ul className="mt-3 space-y-2">
              {sources.map((s, i) => (
                <li key={i} className="flex items-center gap-2 rounded-lg border p-2 text-xs">
                  <FileText className="h-4 w-4 shrink-0 text-r2" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{s.name}</div>
                    <div className="text-muted-foreground">{(s.size / 1024).toFixed(1)} KB · {s.text ? "indexed" : "not readable"}</div>
                  </div>
                  <button onClick={() => setSources((all) => all.filter((_, j) => j !== i))} aria-label="Remove"><Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" /></button>
                </li>
              ))}
            </ul>
          </Card>
          <Card><Disclaimer /></Card>
        </div>
      </div>
    </div>
  );
}
