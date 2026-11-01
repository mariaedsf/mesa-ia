export type DiagnosticCategory = "operation" | "customer" | "menu";
export type DiagnosticPriority = "high" | "medium" | "low";
export type RootCauseIcon = "chart" | "team" | "clock" | "star" | "temperature" | "package" | "menu";

export type OperationalFactor = {
  id: string;
  label: string;
  icon: RootCauseIcon;
  status: string;
  tone: "warning" | "attention" | "positive";
};

export type OperationalHealth = {
  score: number;
  change: string;
  summary: string;
  factors: OperationalFactor[];
};

export type RootCauseStep = {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: RootCauseIcon;
  hint: string;
};

export type Recommendation = {
  id: string;
  title: string;
  description: string;
};

export type Diagnostic = {
  id: string;
  title: string;
  description: string;
  category: DiagnosticCategory;
  priority: DiagnosticPriority;
  icon: RootCauseIcon;
  possibleFactors: string[];
  rootCauseSteps: RootCauseStep[];
  recommendations: Recommendation[];
};

export const diagnosticCategories: { id: "all" | DiagnosticCategory; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "operation", label: "Operação" },
  { id: "customer", label: "Cliente" },
  { id: "menu", label: "Cardápio" },
];

export const demoOperationalHealth: OperationalHealth = {
  score: 82,
  change: "+6 pts",
  summary: "Operação estável, com pontos de atenção no tempo de preparo.",
  factors: [
    { id: "preparation-time", label: "Tempo de preparo", icon: "clock", status: "+27%", tone: "warning" },
    { id: "kitchen-capacity", label: "Capacidade da cozinha", icon: "team", status: "Médio", tone: "attention" },
    { id: "customer-satisfaction", label: "Satisfação do cliente", icon: "star", status: "+3%", tone: "positive" },
  ],
};

export const demoDiagnostics: Diagnostic[] = [
  {
    id: "peak-hour-delays",
    title: "Atrasos no horário de pico",
    description: "+27% no tempo de preparo às sextas, das 19h às 21h.",
    category: "operation",
    priority: "high",
    icon: "clock",
    possibleFactors: ["order-volume", "kitchen-capacity", "preparation-time", "customer-satisfaction"],
    rootCauseSteps: [
      { id: "order-volume", label: "Volume de pedidos", value: "+42%", description: "no volume de pedidos", icon: "chart", hint: "Variação demonstrativa do volume no horário de pico." },
      { id: "kitchen-capacity", label: "Sobrecarga na cozinha", value: "115%", description: "da capacidade estimada", icon: "team", hint: "Hipótese operacional para orientar a investigação." },
      { id: "preparation-time", label: "Tempo de preparo", value: "+27%", description: "no tempo de preparo", icon: "clock", hint: "Variação demonstrativa do tempo de preparo no período." },
      { id: "customer-satisfaction", label: "Satisfação do cliente", value: "-0,4", description: "na satisfação do cliente", icon: "star", hint: "Indicador demonstrativo de satisfação no período." },
    ],
    recommendations: [
      { id: "peak-adjust-kitchen-shift", title: "Ajustar escala de cozinha para sexta", description: "Reforçar a equipe entre 18h e 22h." },
      { id: "peak-test-prep-time", title: "Testar novo tempo de pré-preparo", description: "Reduzir em até 7 minutos o tempo total." },
      { id: "peak-review-complaints", title: "Revisar itens com mais reclamações", description: "Priorizar ajustes de embalagem e entrega." },
    ],
  },
  {
    id: "kitchen-overload",
    title: "Sobrecarga na cozinha",
    description: "Volume de pedidos 42% acima da média no jantar de sexta.",
    category: "operation",
    priority: "medium",
    icon: "team",
    possibleFactors: ["order-volume", "kitchen-capacity", "preparation-time", "staffing"],
    rootCauseSteps: [
      { id: "overload-volume", label: "Volume no jantar", value: "+42%", description: "acima da média", icon: "chart", hint: "Variação demonstrativa de volume no jantar de sexta." },
      { id: "overload-capacity", label: "Capacidade estimada", value: "115%", description: "da capacidade disponível", icon: "team", hint: "Hipótese operacional para avaliar a distribuição de trabalho." },
      { id: "overload-prep", label: "Tempo de preparo", value: "Atenção", description: "acompanhar nos horários de pico", icon: "clock", hint: "Ponto de atenção demonstrativo para investigação." },
      { id: "overload-staffing", label: "Escala da equipe", value: "Revisar", description: "reforço sugerido no jantar", icon: "team", hint: "Sugestão demonstrativa, sujeita à validação da equipe." },
    ],
    recommendations: [
      { id: "overload-reinforce-team", title: "Reforçar equipe no jantar", description: "Avaliar cobertura adicional às sextas." },
      { id: "overload-organize-prep", title: "Organizar o pré-preparo", description: "Preparar os itens mais pedidos antes do pico." },
      { id: "overload-balance-orders", title: "Revisar distribuição de pedidos", description: "Identificar etapas que concentram trabalho." },
    ],
  },
  {
    id: "temperature-complaints",
    title: "Reclamações sobre temperatura",
    description: "Aumento de 18% nas avaliações mencionando comida fria.",
    category: "customer",
    priority: "medium",
    icon: "temperature",
    possibleFactors: ["temperature-feedback", "packaging", "delivery"],
    rootCauseSteps: [
      { id: "temperature-feedback", label: "Menções de temperatura", value: "+18%", description: "nas avaliações", icon: "star", hint: "Variação demonstrativa de avaliações que citam temperatura." },
      { id: "temperature-dishes", label: "Relatos recorrentes", value: "Comida fria", description: "tema para investigar", icon: "temperature", hint: "Tema demonstrativo identificado nas avaliações." },
      { id: "temperature-packaging", label: "Embalagem", value: "A observar", description: "possível fator operacional", icon: "package", hint: "Hipótese a validar com a equipe de entrega." },
      { id: "temperature-delivery", label: "Entrega ao cliente", value: "A revisar", description: "considerar o trajeto", icon: "clock", hint: "Possível contexto relacionado, sem causalidade comprovada." },
    ],
    recommendations: [
      { id: "temperature-review-packaging", title: "Revisar embalagem de entrega", description: "Avaliar retenção de calor e vedação." },
      { id: "temperature-check-dispatch", title: "Conferir temperatura na saída", description: "Adicionar uma verificação antes da expedição." },
      { id: "temperature-reply-reviews", title: "Responder às avaliações", description: "Acompanhar os relatos e registrar os retornos." },
    ],
  },
  {
    id: "menu-margin-opportunity",
    title: "Oportunidade no cardápio",
    description: "Pratos com alta demanda e baixa margem de preparo.",
    category: "menu",
    priority: "low",
    icon: "menu",
    possibleFactors: ["menu-demand", "preparation-cost", "menu-margin"],
    rootCauseSteps: [
      { id: "menu-demand", label: "Demanda do prato", value: "Alta", description: "item com boa procura", icon: "chart", hint: "Classificação demonstrativa de demanda." },
      { id: "menu-prep-cost", label: "Custo de preparo", value: "Elevado", description: "possível ponto de atenção", icon: "package", hint: "Hipótese a validar com custos e processos cadastrados." },
      { id: "menu-time", label: "Tempo de produção", value: "Revisar", description: "avaliar etapas de preparo", icon: "clock", hint: "Investigar se o tempo de produção afeta a margem." },
      { id: "menu-opportunity", label: "Oportunidade", value: "Otimizar", description: "revisar preço, custo e preparo", icon: "menu", hint: "Cenário demonstrativo para apoiar uma análise do cardápio." },
    ],
    recommendations: [
      { id: "menu-review-price", title: "Revisar preço e porção", description: "Comparar custo dos ingredientes com o valor atual." },
      { id: "menu-optimize-prep", title: "Avaliar etapas de preparo", description: "Buscar simplificações sem afetar a qualidade." },
      { id: "menu-monitor-margin", title: "Acompanhar margem do item", description: "Reavaliar o resultado após os ajustes." },
    ],
  },
];
