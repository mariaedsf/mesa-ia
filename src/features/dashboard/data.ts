export const navigation = [
  { label: "Início", href: "/", icon: "home" },
  { label: "Diagnósticos", href: "/diagnosticos", icon: "chart" },
  { label: "Simulador", href: "/simulador", icon: "sliders" },
  { label: "Planos de ação", href: "/planos-de-acao", icon: "check-square" },
  { label: "Cardápio", href: "/cardapio", icon: "utensils" },
  { label: "Avaliações", href: "/avaliacoes", icon: "star" },
  { label: "Dados", href: "/dados", icon: "layers" },
] as const;

export const dashboardPeriods = ["Hoje", "Esta semana", "Este mês"] as const;
