"use client";

import { reviewsClassName } from "../../tailwind-styles";

import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";

export function SummaryCard({ icon: Icon, label, value, detail, tone }: { icon: typeof Star; label: string; value: string; detail: string; tone: string }) {
  return (
    <Card className={reviewsClassName("reviews-summary-card")}>
      <span className={reviewsClassName(`reviews-summary-icon ${tone}`)}><Icon size={21} aria-hidden="true" /></span>
      <div className={reviewsClassName("reviews-summary-copy")}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>
    </Card>
  );
}
