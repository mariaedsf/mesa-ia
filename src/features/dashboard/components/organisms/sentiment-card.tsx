"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";

import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { SentimentDetailsDialog } from "@/features/dashboard/components/organisms/sentiment-details-dialog";

import type { DashboardReadModel, SentimentLabel } from "@server/application/read-models";
import type { Review } from "@/features/reviews/data";

import { Pie, PieChart } from "recharts";

import { sentimentChartConfig, sentimentDotClass } from "../widgets.shared";

export function SentimentCard({ sentiments, reviews, totalReviews }: { sentiments: DashboardReadModel["sentiments"]; reviews: Review[]; totalReviews: number }) {
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentLabel | null>(null);
  const positive = sentiments.find((item) => item.name === "Positivo")?.value ?? 0;
  const chartData = sentiments.map((item) => ({
    ...item,
    key: item.name === "Positivo" ? "positive" : item.name === "Neutro" ? "neutral" : "negative",
  }));

  function openSentiment(sentiment: SentimentLabel) {
    setSelectedSentiment(sentiment);
  }

  return (
    <>
      <Card className="surface sentiment-card">
        <CardHeader className="card-heading">
          <CardTitle>Sentimento geral</CardTitle>
          <span className="sample-tag">{totalReviews} avaliações</span>
        </CardHeader>
        <div className="sentiment-content">
          <div className="sentiment-ring-wrap" role="img" aria-label={`${positive} por cento de sentimento positivo`}>
            <ChartContainer className="sentiment-chart" config={sentimentChartConfig} initialDimension={{ width: 112, height: 112 }}>
              <PieChart accessibilityLayer>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      nameKey="name"
                      hideLabel
                      formatter={(value, name) => `${name}: ${value}% · clique para explorar`}
                    />
                  }
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={43}
                  outerRadius={53}
                  paddingAngle={3}
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive={false}
                  cursor="pointer"
                  onClick={(_, index) => {
                    const segment = chartData[index];
                    if (segment) openSentiment(segment.name);
                  }}
                />
              </PieChart>
            </ChartContainer>
            <div className="sentiment-center"><strong>{positive}%</strong><span>Positivo</span></div>
          </div>
          <div className="sentiment-legend" role="group" aria-label="Abrir avaliações por sentimento">
            {sentiments.map((item) => (
              <Button
                key={item.name}
                className="sentiment-legend-row"
                variant="ghost"
                aria-label={`Ver avaliações ${item.name.toLowerCase()}`}
                onClick={() => openSentiment(item.name)}
              >
                <i className={`sentiment-dot ${sentimentDotClass[item.name]}`} />
                <span>{item.name}</span>
                <strong>{item.value}%</strong>
                <Icon name="chevron-right" size={13} />
              </Button>
            ))}
          </div>
        </div>
      </Card>
      <SentimentDetailsDialog
        key={selectedSentiment ?? "closed"}
        sentiment={selectedSentiment}
        reviews={reviews}
        onOpenChange={(open) => {
          if (!open) setSelectedSentiment(null);
        }}
      />
    </>
  );
}
