export const actionStatuses = ["active", "completed", "pending"] as const;

export type ActionStatus = (typeof actionStatuses)[number];
export type PlanActionStatus = ActionStatus;
export type PlanActionIcon =
  | "chef"
  | "clock"
  | "message"
  | "package"
  | "star"
  | "chart"
  | "team"
  | "calendar";

export type PlanAction = {
  id: string;
  title: string;
  description: string;
  responsible: string;
  role: string;
  initials: string;
  due: string;
  day: string;
  date: string;
  time: string;
  status: PlanActionStatus;
  icon: PlanActionIcon;
  overdue?: boolean;
};

export type DiagnosticRecommendation = {
  id: string;
  title: string;
  description: string;
};
