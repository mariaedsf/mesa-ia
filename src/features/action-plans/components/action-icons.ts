import {
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ChefHat,
  Clock3,
  MessageCircle,
  Package,
  Star,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { PlanActionIcon } from "../data";

export const actionIcons: Record<PlanActionIcon, LucideIcon> = {
  chef: ChefHat,
  clock: Clock3,
  message: MessageCircle,
  package: Package,
  star: Star,
  chart: ChartNoAxesColumnIncreasing,
  team: UsersRound,
  calendar: CalendarDays,
};
