import type { DiagnosticPriority } from "@/features/diagnostics/data";

import { priorityLabels, priorityDescriptions } from "../list.shared";

export function DiagnosticPriorityBadge({ priority }: { priority: DiagnosticPriority }) { return <span className={"diagnostics-priority " + priority} aria-label={priorityDescriptions[priority]}>{priorityLabels[priority]}</span>; }
