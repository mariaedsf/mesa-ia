"use client";

import { menuClassName } from "../../tailwind-styles";

import { menuTabs, type MenuTabId } from "@/features/menu/data";

import { tabIcons } from "../menu.shared";

export function MenuTabs({ activeTab, onChange }: { activeTab: MenuTabId; onChange: (tab: MenuTabId) => void }) {
  return (
    <div className={menuClassName("menu-tabs")} role="tablist" aria-label="Seções do cardápio">
      {menuTabs.map((tab) => {
        const TabIcon = tabIcons[tab.id];
        return (
          <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} className={menuClassName(`menu-tab${activeTab === tab.id ? " active" : ""}`)} onClick={() => onChange(tab.id)}>
            <TabIcon size={20} strokeWidth={1.9} aria-hidden="true" /><span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
