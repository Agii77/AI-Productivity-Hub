import { useEffect, useState } from "react";

export const MODELS = [
  { id: "llama", name: "Llama 3.3 70B", short: "Llama 3.3", org: "Meta", license: "Llama Community License", ctx: "128K", strengths: "Balanced reasoning, writing & general workplace tasks", bar: "bg-r5" },
  { id: "qwen", name: "Qwen 2.5 72B", short: "Qwen 2.5", org: "Alibaba", license: "Qwen License (open weights)", ctx: "128K", strengths: "Structured output, planning, multilingual & coding", bar: "bg-r4" },
  { id: "kimi", name: "Kimi K2", short: "Kimi K2", org: "Moonshot AI", license: "Modified MIT", ctx: "128K", strengths: "Long documents, research & agentic tasks", bar: "bg-r6" },
] as const;
export type ModelId = (typeof MODELS)[number]["id"];

const KEY = "active-model";
export function useModel() {
  const [id, setId] = useState<ModelId>("llama");
  useEffect(() => {
    const read = () => setId((localStorage.getItem(KEY) as ModelId) || "llama");
    read();
    window.addEventListener("model-change", read);
    return () => window.removeEventListener("model-change", read);
  }, []);
  const set = (m: ModelId) => { localStorage.setItem(KEY, m); window.dispatchEvent(new Event("model-change")); };
  return { model: MODELS.find((m) => m.id === id) ?? MODELS[0], setModel: set };
}
