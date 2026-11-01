"use client";

import { useId } from "react";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { Area, AreaChart } from "recharts";

export function Sparkline({ label, negative = false }: { label: string; negative?: boolean }) {
  const gradientId = `sparkline-fill-${useId().replace(/:/g, "")}`;
  const data = [8, 13, 12, 18, 15, 22, 24, 29].map((orders, index) => ({
    index,
    orders: negative ? orders - (index > 4 ? 5 : 0) : orders,
  }));

  return (
    <ChartContainer
      className={`sparkline${negative ? " sparkline-negative" : ""}`}
      config={{ orders: { label, color: "#fa841d" } }}
      initialDimension={{ width: 67, height: 29 }}
      role="group"
      aria-label={`Tendência de ${label}`}
    >
      <AreaChart accessibilityLayer data={data} margin={{ top: 3, right: 1, bottom: 0, left: 1 }}>
        <ChartTooltip
          cursor={false}
          allowEscapeViewBox={{ x: true, y: true }}
          reverseDirection={{ x: true, y: true }}
          content={
            <ChartTooltipContent
              indicator="dot"
              labelFormatter={(point) => `${label} · período ${Number(point) + 1}`}
              formatter={(value) => `Índice ${value}`}
            />
          }
        />
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity=".15" />
            <stop offset="100%" stopColor="#f97316" stopOpacity=".01" />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="orders"
          stroke={negative ? "#f8a77a" : "#fa841d"}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          isAnimationActive={false}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
