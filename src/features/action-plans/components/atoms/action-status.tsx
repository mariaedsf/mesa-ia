import type { PlanAction } from "@/features/action-plans/data";

import { actionStatusLabel } from "../summary.shared";

export function ActionStatus({ action }: { action: PlanAction }) {
  return <span className={`plans-action-status ${action.status}${action.overdue && action.status !== "completed" ? " overdue" : ""}`}>{actionStatusLabel(action)}</span>;
}
