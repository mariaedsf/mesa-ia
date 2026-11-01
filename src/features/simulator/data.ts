import type { SimulationInputs } from "@server/domain/simulation";

export type ScenarioArea = "operation" | "demand" | "menu" | "team";
export type ScenarioPreset = {
  id: string;
  label: string;
  description: string;
  area: ScenarioArea;
  inputs: SimulationInputs;
};

export { estimateScenario, type SimulationInputs, type SimulationResults } from "@server/domain/simulation";

export function createScenarioPresets(baseline: SimulationInputs): ScenarioPreset[] {
  return [
    {
      id: "extra-staff",
      label: "Reforçar a equipe",
      description: "Simule uma pessoa a mais na cozinha.",
      area: "operation",
      inputs: { ...baseline, teamSize: Math.min(200, baseline.teamSize + 1) },
    },
    {
      id: "prep-ahead",
      label: "Reduzir o preparo",
      description: "Compare uma redução de 2 minutos no preparo.",
      area: "operation",
      inputs: { ...baseline, prepMinutes: Math.max(0, baseline.prepMinutes - 2) },
    },
    {
      id: "demand-peak",
      label: "Aumentar a demanda",
      description: "Veja o efeito de 10% mais demanda.",
      area: "demand",
      inputs: { ...baseline, demandIncrease: 10 },
    },
    {
      id: "menu-adjustment",
      label: "Otimizar o cardápio",
      description: "Simule a otimização de um prato e 3% de margem.",
      area: "menu",
      inputs: { ...baseline, optimizedDishes: 1, marginIncrease: 3 },
    },
  ];
}
