export const menuTabs = [
  { id: "performance", label: "Desempenho", icon: "chart" },
  { id: "items", label: "Análise de itens", icon: "box" },
  { id: "suggestions", label: "Sugestões", icon: "sparkles" },
  { id: "management", label: "Gestão do cardápio", icon: "sliders" },
] as const;

export type MenuTabId = (typeof menuTabs)[number]["id"];
