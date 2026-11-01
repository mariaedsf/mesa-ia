"use client";

import { Icon } from "@/components/ui/icon";

import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function MenuHighlights({ popularItems, onViewAll }: { popularItems: { name: string; change: string; itemId: string }[]; onViewAll: () => void }) {
  return (
    <Card className="surface menu-card">
      <CardHeader className="card-heading">
        <CardTitle>Itens em destaque</CardTitle>
        <Button className="text-link" variant="ghost" onClick={onViewAll}>
          Ver todos <Icon name="arrow-right" size={15} />
        </Button>
      </CardHeader>
      <div className="popular-list">
        {popularItems.length === 0 && <p className="card-empty">Os itens mais vendidos aparecerão após cadastrar pedidos e itens do cardápio.</p>}
        {popularItems.slice(0, 2).map((item, index) => (
          <div className="popular-item" key={item.name}>
            <div className={`dish-thumbnail dish-${index}`} aria-hidden="true" />
            <div className="popular-copy"><strong>{item.name}</strong><span>{item.change} em pedidos</span></div>
            <Icon name={item.change.startsWith("-") ? "arrow-down-right" : "arrow-up-right"} className="popular-trend" size={20} />
          </div>
        ))}
      </div>
      <p className="menu-footnote">Variação em relação à semana anterior</p>
    </Card>
  );
}
