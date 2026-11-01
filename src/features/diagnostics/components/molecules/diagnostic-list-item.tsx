import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Diagnostic } from "@/features/diagnostics/data";

import { DiagnosticIcon } from "../atoms/diagnostic-icon";

import { DiagnosticPriorityBadge } from "../atoms/diagnostic-priority-badge";

export function DiagnosticListItem({ diagnostic, selected, onSelect }: { diagnostic: Diagnostic; selected: boolean; onSelect: () => void }) {
  return <Button type="button" variant="ghost" className={"diagnostics-list-item" + (selected ? " selected" : "")} aria-pressed={selected} onClick={onSelect}><span className={"diagnostics-item-icon " + diagnostic.category}><DiagnosticIcon name={diagnostic.icon} size={23} /></span><span className="diagnostics-item-copy"><strong>{diagnostic.title}</strong><small>{diagnostic.description}</small></span><DiagnosticPriorityBadge priority={diagnostic.priority} /><ChevronRight className="diagnostics-item-chevron" size={19} aria-hidden="true" /></Button>;
}
