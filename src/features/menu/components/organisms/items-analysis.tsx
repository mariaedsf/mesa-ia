"use client";

import { menuClassName } from "../../tailwind-styles";

import { Search, Star } from "lucide-react";

import { Card } from "@/components/ui/card";

import { MenuItem } from "../menu.shared";

import { MenuItemThumbnail } from "../atoms/menu-item-thumbnail";

export function ItemsAnalysis({ items, onSearch, onSelectItem, search }: { items: readonly MenuItem[]; onSearch: (value: string) => void; onSelectItem: (item: MenuItem) => void; search: string }) {
  return (
    <Card className={menuClassName("surface menu-panel menu-list-view")}>
      <div className={menuClassName("menu-list-heading")}><div><h2>Análise de itens</h2><p>Compare vendas, avaliação e margem dos seus pratos.</p></div><label className={menuClassName("menu-search")}><Search size={16} aria-hidden="true" /><input type="search" value={search} onChange={(event) => onSearch(event.currentTarget.value)} placeholder="Buscar prato..." aria-label="Buscar prato" /></label></div>
      <div className={menuClassName("menu-analysis-table")}>
        <div className={menuClassName("menu-table-heading")}><span>Prato</span><span>Categoria</span><span>Pedidos</span><span>Avaliação</span><span>Margem</span></div>
        {items.map((item) => (
          <button className={menuClassName("menu-analysis-row")} key={item.id} type="button" onClick={() => onSelectItem(item)}>
            <span className={menuClassName("menu-analysis-dish")}><MenuItemThumbnail item={item} /><strong>{item.name}</strong></span><span>{item.category}</span><span>{item.orders}</span><span><Star size={13} fill="#f6a340" stroke="#f6a340" />{item.rating}</span><span className={menuClassName("menu-margin-value")}>{item.margin}</span>
          </button>
        ))}
        {items.length === 0 && <p className={menuClassName("menu-empty")}>Nenhum prato encontrado.</p>}
      </div>
    </Card>
  );
}
