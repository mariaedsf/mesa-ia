import { type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

export function SummaryStat({ icon: Icon, label, value, detail, tone, percent }: {
  icon: LucideIcon; label: string; value: string; detail: string; tone: "orange" | "green"; percent?: number;
}) {
  return (
    <Card className="surface plans-stat-card">
      <span className={`plans-stat-icon ${tone}`}><Icon size={22} aria-hidden="true" /></span>
      <div className="plans-stat-copy"><span className="plans-stat-label">{label}</span><strong>{value}</strong><small>{detail}</small>
        {percent !== undefined && <span className="plans-stat-track" aria-hidden="true"><i className={tone} style={{ width: `${percent}%` }} /></span>}
      </div>
    </Card>
  );
}
