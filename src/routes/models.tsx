import { createFileRoute } from "@tanstack/react-router";
import { Check, Unlock } from "lucide-react";
import { Card, Disclaimer, PageHeader } from "@/components/ui-kit";
import { MODELS, useModel } from "@/lib/model";

export const Route = createFileRoute("/models")({
  head: () => ({
    meta: [
      { title: "Open Models · Workplace AI" },
      { name: "description", content: "Choose between open models Llama, Qwen and Kimi." },
      { property: "og:title", content: "Open Models" },
      { property: "og:description", content: "Choose between open models Llama, Qwen and Kimi." },
    ],
  }),
  component: ModelsPage,
});

function ModelsPage() {
  const { model, setModel } = useModel();
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Open Models" desc="This app runs on open-weight models. Pick the one that powers every workspace." accent="bg-rainbow" />
      <Card className="mb-5 flex items-start gap-3">
        <Unlock className="mt-0.5 h-5 w-5 shrink-0 text-r4" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Built on open models.</span> Open weights mean transparency, no vendor lock-in and the option to self-host for data privacy.
        </p>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {MODELS.map((m) => {
          const active = m.id === model.id;
          return (
            <button key={m.id} onClick={() => setModel(m.id)} className="text-left">
              <Card className={`relative h-full overflow-hidden transition-all ${active ? "ring-2 ring-ring" : "hover:-translate-y-0.5"}`}>
                <div className={`absolute inset-x-0 top-0 h-1 ${m.bar}`} />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{m.org}</span>
                  {active && <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground"><Check className="h-3 w-3" /> Active</span>}
                </div>
                <h2 className="mt-2 text-lg font-semibold">{m.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{m.strengths}</p>
                <dl className="mt-4 space-y-1 text-xs">
                  <div className="flex justify-between"><dt className="text-muted-foreground">License</dt><dd>{m.license}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Context</dt><dd>{m.ctx}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Weights</dt><dd>Open</dd></div>
                </dl>
              </Card>
            </button>
          );
        })}
      </div>
      <Card className="mt-5"><Disclaimer /></Card>
    </div>
  );
}
