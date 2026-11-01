"use client";

import { menuClassName } from "../../tailwind-styles";

import { ArrowDownRight, ArrowUp, ChevronRight } from "lucide-react";

import { MenuItem } from "../menu.shared";

import { MenuItemThumbnail } from "../atoms/menu-item-thumbnail";

export function MenuItemRow({ item, index, onSelect }: { item: MenuItem; index: number; onSelect: (item: MenuItem) => void }) {
  const isNegative = item.change.startsWith("−");
  return (
    <button className={menuClassName("menu-item-row")} type="button" onClick={() => onSelect(item)}>
      <span className={menuClassName(`menu-item-rank${index === 0 ? " first" : ""}`)}>{index + 1}</span>
      <MenuItemThumbnail item={item} />
      <span className={menuClassName("menu-item-copy")}><strong>{item.name}</strong><small>{item.orders} pedidos</small></span>
      <span className={menuClassName(`menu-item-change${isNegative ? " negative" : ""}`)}>{isNegative ? <ArrowDownRight size={13} /> : <ArrowUp size={13} />}{item.change}</span>
      <ChevronRight size={18} className={menuClassName("menu-item-chevron")} aria-hidden="true" />
    </button>
  );
}
