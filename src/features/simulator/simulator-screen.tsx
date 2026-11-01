"use client";

import Link from "next/link";
import { useEffect, useId, useState, useTransition } from "react";
import { saveSimulationAction } from "@server/actions";
import type { SimulationReadModel } from "@server/application/read-models";
import { useRestaurantName } from "@/components/workspace-shell";
import { createScenarioPresets, estimateScenario, type ScenarioArea, type ScenarioPreset, type SimulationInputs } from "@/features/simulator/data";
import { formatCurrency, formatNumber, joinPhrases, percentChange, type InputKey } from "@/features/simulator/components/simulator.shared";
import { SimulatorHeaderActions } from "@/features/simulator/components/molecules/simulator-header-actions";
import { SimulatorToast } from "@/features/simulator/components/atoms/simulator-toast";
import { SimulatorAreaTabs } from "@/features/simulator/components/molecules/simulator-area-tabs";
import { SimulatorControlsCard } from "@/features/simulator/components/organisms/simulator-controls-card";
import { SimulatorInsightCard } from "@/features/simulator/components/organisms/simulator-insight-card";
import { SimulatorResultsCard } from "@/features/simulator/components/organisms/simulator-results-card";
import { SimulatorScenarioPresets } from "@/features/simulator/components/organisms/simulator-scenario-presets";

export function SimulatorScreen({ data }: { data: SimulationReadModel }) {
  const restaurantName = useRestaurantName();
  const gradientId = "simulator-area-" + useId().replace(/:/g, "");
  const [inputs, setInputs] = useState<SimulationInputs>(() => ({ ...data.baselineInputs }));
  const [activeArea, setActiveArea] = useState<ScenarioArea>("operation");
  const [activePreset, setActivePreset] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const presets = createScenarioPresets(data.baselineInputs);
  const results = estimateScenario(inputs, data.baselineInputs, data.baselineResults);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  function updateInput(key: InputKey, value: number) {
    setInputs((current) => ({ ...current, [key]: value }));
    setActivePreset("custom");
  }

  function choosePreset(preset: ScenarioPreset) {
    setInputs({ ...preset.inputs });
    setActiveArea(preset.area);
    setActivePreset(preset.id);
  }

  function resetScenario() {
    setInputs({ ...data.baselineInputs });
    setActiveArea("operation");
    setActivePreset("");
    setToastMessage("Cenário restaurado aos dados registrados.");
  }

  const preparationDelta = results.preparationMinutes - data.baselineResults.preparationMinutes;
  const peakDelta = results.peakPreparationMinutes - data.baselineResults.peakPreparationMinutes;
  const satisfactionDelta = data.baselineResults.customerSatisfaction === null || results.customerSatisfaction === null
    ? null
    : results.customerSatisfaction - data.baselineResults.customerSatisfaction;
  const revenueDelta = data.baselineResults.estimatedRevenue === null || results.estimatedRevenue === null
    ? null
    : results.estimatedRevenue - data.baselineResults.estimatedRevenue;
  const teamDelta = inputs.teamSize - data.baselineInputs.teamSize;
  const prepAdjustment = data.baselineInputs.prepMinutes - inputs.prepMinutes;
  const orderAdjustment = inputs.ordersPerHour - data.baselineInputs.ordersPerHour;
  const stationAdjustment = inputs.stationsReinforced - data.baselineInputs.stationsReinforced;
  const experienceAdjustment = inputs.teamExperience - data.baselineInputs.teamExperience;
  const changes: string[] = [];

  if (teamDelta) changes.push(`${Math.abs(teamDelta)} ${Math.abs(teamDelta) === 1 ? "pessoa" : "pessoas"} ${teamDelta > 0 ? "a mais" : "a menos"} na cozinha`);
  if (prepAdjustment) changes.push(`${formatNumber(Math.abs(prepAdjustment), 1)} min ${prepAdjustment > 0 ? "a menos" : "a mais"} de preparo`);
  if (orderAdjustment) changes.push(`${formatNumber(Math.abs(orderAdjustment), 1)} pedidos por hora ${orderAdjustment > 0 ? "a mais" : "a menos"}`);
  if (inputs.demandIncrease > 0) changes.push(`demanda ${inputs.demandIncrease}% maior`);
  if (inputs.optimizedDishes > 0) changes.push(`${inputs.optimizedDishes} pratos otimizados`);
  if (inputs.marginIncrease > 0) changes.push(`margem ${inputs.marginIncrease}% maior`);
  if (stationAdjustment) changes.push(`${Math.abs(stationAdjustment)} ${Math.abs(stationAdjustment) === 1 ? "estação" : "estações"} ${stationAdjustment > 0 ? "a mais" : "a menos"}`);
  if (experienceAdjustment) changes.push(`experiência da equipe ${experienceAdjustment > 0 ? "+" : ""}${experienceAdjustment}%`);

  const preparationChange = data.baselineResults.preparationMinutes
    ? Math.round(((data.baselineResults.preparationMinutes - results.preparationMinutes) / data.baselineResults.preparationMinutes) * 100)
    : 0;
  const revenueSummary = revenueDelta === null
    ? "sem uma base de receita semanal cadastrada"
    : `${revenueDelta >= 0 ? "ganho estimado de " : "redução estimada de "}${percentChange(data.baselineResults.estimatedRevenue ?? 0, results.estimatedRevenue ?? 0, 1).replace(/[+−]/g, "")} na receita`;
  const insightText = changes.length
    ? `Com ${joinPhrases(changes)}, o tempo de preparo pode ${preparationDelta <= 0 ? "cair" : "subir"} ${Math.abs(preparationChange)}%, ${revenueSummary}.`
    : "Ajuste os controles para comparar o cenário com os registros desta operação.";

  const chartData = data.hourlyPreparation.map((point) => {
    const projected = point.current + peakDelta;
    return { ...point, simulated: Math.max(0, Number(projected.toFixed(1))) };
  });
  const selectedPoint = chartData.reduce((peak, point) => point.current > peak.current ? point : peak, chartData[0] ?? { hour: "", current: 0, simulated: 0 });
  const chartMax = Math.max(5, Math.ceil(Math.max(...chartData.flatMap((point) => [point.current, point.simulated])) / 5) * 5);
  const chartTicks = Array.from({ length: chartMax / 5 + 1 }, (_, index) => index * 5);

  const impactBadge = (delta: number | null, base: number | null, lowerIsBetter: boolean, decimals = 0) => {
    if (delta === null || base === null) return { label: "—", favorable: false };
    const favorable = lowerIsBetter ? delta <= 0 : delta >= 0;
    return { label: percentChange(base, base + delta, decimals), favorable };
  };

  const preparationImpact = impactBadge(preparationDelta, data.baselineResults.preparationMinutes, true);
  const satisfactionImpact = impactBadge(satisfactionDelta, data.baselineResults.customerSatisfaction, false, 1);
  const revenueImpact = impactBadge(revenueDelta, data.baselineResults.estimatedRevenue, false, 1);

  async function shareScenario() {
    const satisfaction = results.customerSatisfaction === null ? "sem avaliações cadastradas" : `${formatNumber(results.customerSatisfaction, 1)} de satisfação`;
    const revenue = results.estimatedRevenue === null ? "sem base de receita semanal" : `${formatCurrency(results.estimatedRevenue)} de receita estimada`;
    const summary = `Simulação MESA para ${restaurantName}: ${formatNumber(results.preparationMinutes, 1)} min de preparo, ${satisfaction} e ${revenue}.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Cenário MESA", text: summary });
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summary);
        setToastMessage("Resumo do cenário copiado.");
        return;
      }
      setToastMessage("Resumo do cenário pronto para compartilhar.");
    } catch {
      setToastMessage("Não foi possível compartilhar agora.");
    }
  }

  if (!data.hasOrders) {
    return (
      <div className="simulator-page">
        <header className="simulator-header"><div className="simulator-page-heading"><h1>Simulador</h1><p>Compare cenários usando os dados registrados na operação.</p></div><SimulatorHeaderActions /></header>
        <section className="card-empty"><h2>Registre pedidos para simular</h2><p>O cenário de referência usa a equipe cadastrada e os tempos de preparo dos pedidos deste restaurante.</p><Link className="button button-primary" href="/dados">Cadastrar pedidos</Link></section>
      </div>
    );
  }

  return (
    <div className="simulator-page">
      <header className="simulator-header"><div className="simulator-page-heading"><h1>Simulador</h1><p>Compare mudanças com o histórico registrado de {restaurantName}.</p></div><SimulatorHeaderActions /></header>
      <SimulatorAreaTabs activeArea={activeArea} onChange={setActiveArea} />
      <div className="simulator-main-grid">
        <SimulatorControlsCard activeArea={activeArea} inputs={inputs} changes={changes} teamDelta={teamDelta} prepAdjustment={prepAdjustment} onChange={updateInput} onReset={resetScenario} />
        <SimulatorResultsCard results={results} baselineResults={data.baselineResults} chartData={chartData} chartMax={chartMax} chartTicks={chartTicks} selectedPoint={selectedPoint} gradientId={gradientId} />
        <SimulatorInsightCard insightText={insightText} peakDelta={peakDelta} satisfactionDelta={satisfactionDelta} revenueDelta={revenueDelta} preparationImpact={preparationImpact} satisfactionImpact={satisfactionImpact} revenueImpact={revenueImpact} onApply={() => startTransition(async () => { await saveSimulationAction(inputs); setToastMessage("Cenário salvo no plano de ação."); })} onShare={shareScenario} />
      </div>
      <SimulatorScenarioPresets presets={presets} activePreset={activePreset} onChoose={choosePreset} />
      {toastMessage && <SimulatorToast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
}
