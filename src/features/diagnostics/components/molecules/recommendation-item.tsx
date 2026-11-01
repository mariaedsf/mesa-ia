import { Check, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Recommendation } from "@/features/diagnostics/data";

export function RecommendationItem({ recommendation, selected, onSelect }: { recommendation: Recommendation; selected: boolean; onSelect: () => void }) {
  return <Button type="button" variant="ghost" className={"diagnostics-recommendation" + (selected ? " selected" : "")} aria-pressed={selected} onClick={onSelect}><span className={"diagnostics-recommendation-indicator" + (selected ? " checked" : "")}>{selected && <Check size={15} aria-hidden="true" />}</span><span className="diagnostics-recommendation-copy"><strong>{recommendation.title}</strong><small>{recommendation.description}</small></span><ChevronRight size={19} className="diagnostics-recommendation-chevron" aria-hidden="true" /></Button>;
}
