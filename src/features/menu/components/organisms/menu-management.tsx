"use client";

import { menuClassName } from "../../tailwind-styles";

import { Check } from "lucide-react";

import { Card } from "@/components/ui/card";

import { useMenuData } from "@/features/menu/menu-data-context";

import { MenuItem } from "../menu.shared";

import { MenuItemThumbnail } from "../atoms/menu-item-thumbnail";

export function MenuManagement({ available, onToggle, onSelectItem }: { available: Set<string>; onToggle: (id: string) => void; onSelectItem: (item: MenuItem) => void }) {
  const { menuItems } = useMenuData();
  return (
    <Card className={menuClassName("surface menu-panel menu-list-view")}>
      <div className={menuClassName("menu-list-heading")}><div><h2>Gestão do cardápio</h2><p>Atualize a disponibilidade dos pratos e acompanhe sua margem.</p></div><span className={menuClassName("menu-management-count")}>{available.size} itens disponíveis</span></div>
      <div className={menuClassName("menu-analysis-table")}>
        <div className={menuClassName("menu-table-heading menu-management-heading")}><span>Prato</span><span>Categoria</span><span>Pedidos</span><span>Margem</span><span>Disponibilidade</span></div>
        {menuItems.map((item) => <div className={menuClassName(`menu-management-row${available.has(item.id) ? "" : " unavailable"}`)} key={item.id}>
          <button type="button" className={menuClassName("menu-analysis-dish")} onClick={() => onSelectItem(item)}><MenuItemThumbnail item={item} /><strong>{item.name}</strong></button><span>{item.category}</span><span>{item.orders}</span><span className={menuClassName("menu-margin-value")}>{item.margin}</span>
          <button type="button" className={menuClassName(`menu-availability${available.has(item.id) ? " available" : ""}`)} aria-pressed={available.has(item.id)} onClick={() => onToggle(item.id)}><i>{available.has(item.id) && <Check size={12} />}</i>{available.has(item.id) ? "Disponível" : "Pausado"}</button>
        </div>)}
        {menuItems.length === 0 && <p className={menuClassName("menu-empty")}>Cadastre os itens do restaurante em Dados da operação.</p>}
      </div>
    </Card>
  );
}
