"use client";

import { useMemo, useState, useTransition } from "react";
import { setMenuItemAvailabilityAction } from "@server/actions";
import { menuTabs, type MenuTabId } from "@/features/menu/data";
import type { MenuReadModel } from "@server/application/read-models";
import { MenuDataProvider } from "@/features/menu/menu-data-context";
import { menuClassName } from "@/features/menu/tailwind-styles";
import type { MenuInsight, MenuItem } from "@/features/menu/components/menu.shared";
import { MenuMetricCard } from "@/features/menu/components/molecules/menu-metric-card";
import { MenuTabs } from "@/features/menu/components/molecules/menu-tabs";
import { ItemsAnalysis } from "@/features/menu/components/organisms/items-analysis";
import { MenuHeaderActions } from "@/features/menu/components/organisms/menu-header-actions";
import { MenuManagement } from "@/features/menu/components/organisms/menu-management";
import { MenuPerformance } from "@/features/menu/components/organisms/menu-performance";
import { SuggestionsView } from "@/features/menu/components/organisms/suggestions-view";
import { MenuItemDetailDialog } from "@/features/menu/components/organisms/menu-item-detail-dialog";
import { MenuInsightDialog } from "@/features/menu/components/organisms/menu-insight-dialog";

export function MenuScreen({ data }: { data: MenuReadModel }) {
  const [activeTab, setActiveTab] = useState<MenuTabId>("performance");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<MenuInsight | null>(null);
  const [availableItems, setAvailableItems] = useState<Set<string>>(() => new Set(data.menuItems.filter((item) => item.available).map((item) => item.id)));
  const [, startTransition] = useTransition();
  const filteredItems = useMemo(() => data.menuItems.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(search.toLowerCase())), [data.menuItems, search]);

  function toggleAvailability(id: string) {
    const available = !availableItems.has(id);
    setAvailableItems((current) => { const next = new Set(current); if (available) next.add(id); else next.delete(id); return next; });
    startTransition(() => setMenuItemAvailabilityAction(id, available));
  }

  return (
    <MenuDataProvider value={data}>
    <div className={menuClassName("menu-page")}>
      <header className={menuClassName("menu-page-header")}>
        <div className={menuClassName("menu-page-heading")}><h1>Cardápio</h1><p>Analise o desempenho dos seus pratos e descubra oportunidades de otimização.</p></div>
        <MenuHeaderActions />
      </header>
      <MenuTabs activeTab={activeTab} onChange={setActiveTab} />
      <section className={menuClassName("menu-metrics-grid")} aria-label="Indicadores do cardápio">{data.menuMetrics.map((metric) => <MenuMetricCard metric={metric} key={metric.label} />)}</section>
      <div id="menu-tabpanel" className={menuClassName("#menu-tabpanel")} role="tabpanel" aria-label={menuTabs.find((tab) => tab.id === activeTab)?.label}>
        {activeTab === "performance" && <MenuPerformance onSelectItem={setSelectedItem} onViewAll={() => setActiveTab("items")} onSelectInsight={setSelectedInsight} />}
        {activeTab === "items" && <ItemsAnalysis items={filteredItems} search={search} onSearch={setSearch} onSelectItem={setSelectedItem} />}
        {activeTab === "suggestions" && <SuggestionsView onSelectInsight={setSelectedInsight} />}
        {activeTab === "management" && <MenuManagement available={availableItems} onToggle={toggleAvailability} onSelectItem={setSelectedItem} />}
      </div>
      <footer className={menuClassName("menu-page-footnote")}>Indicadores calculados a partir dos dados cadastrados</footer>

      <MenuItemDetailDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
      <MenuInsightDialog insight={selectedInsight} onClose={() => setSelectedInsight(null)} />
    </div>
    </MenuDataProvider>
  );
}
