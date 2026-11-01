import type { PlanAction } from "@/features/action-plans/data";

export type ActionCounts = { total: number; active: number; completed: number; pending: number };

export function actionStatusLabel(action: PlanAction) {
  if (action.status === "completed") return "Concluída";
  if (action.overdue) return "Atrasada";
  return action.status === "active" ? "Em andamento" : "Pendente";
}
