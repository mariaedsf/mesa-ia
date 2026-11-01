export type SimulationInputs = {
  teamSize: number;
  ordersPerHour: number;
  prepMinutes: number;
  demandIncrease: number;
  optimizedDishes: number;
  marginIncrease: number;
  stationsReinforced: number;
  teamExperience: number;
};

export type SimulationResults = {
  preparationMinutes: number;
  peakPreparationMinutes: number;
  kitchenCapacity: number;
  customerSatisfaction: number | null;
  estimatedRevenue: number | null;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const roundToOneDecimal = (value: number) => Math.round(value * 10) / 10;

export function estimateScenario(
  inputs: SimulationInputs,
  baseline: SimulationInputs,
  actuals: SimulationResults,
): SimulationResults {
  const teamDelta = inputs.teamSize - baseline.teamSize;
  const preparationDelta = baseline.prepMinutes - inputs.prepMinutes;
  const stationDelta = inputs.stationsReinforced - baseline.stationsReinforced;
  const experienceDelta = inputs.teamExperience - baseline.teamExperience;
  const demandDelta = inputs.ordersPerHour - baseline.ordersPerHour;

  const preparationAdjustment =
    -teamDelta * 1.5 -
    preparationDelta * 0.5 +
    (demandDelta + baseline.ordersPerHour * inputs.demandIncrease / 100) * 0.12 -
    inputs.optimizedDishes * 0.2 -
    stationDelta * 0.7 -
    experienceDelta * 0.02;
  const preparationMinutes = roundToOneDecimal(
    clamp(actuals.preparationMinutes + preparationAdjustment, 0, 600),
  );
  const peakPreparationMinutes = roundToOneDecimal(
    clamp(actuals.peakPreparationMinutes + preparationAdjustment * 1.25, 0, 600),
  );
  const kitchenCapacity = roundToOneDecimal(
    Math.max(
      0,
      actuals.kitchenCapacity + teamDelta * 4 + stationDelta * 3 + experienceDelta * 0.1,
    ),
  );
  const customerSatisfaction = actuals.customerSatisfaction === null
    ? null
    : roundToOneDecimal(clamp(
        actuals.customerSatisfaction +
          (actuals.preparationMinutes - preparationMinutes) * 0.025 +
          inputs.optimizedDishes * 0.01,
        1,
        5,
      ));
  const estimatedRevenue = actuals.estimatedRevenue === null
    ? null
    : Math.max(
        0,
        Math.round(
          actuals.estimatedRevenue *
            (1 + (inputs.demandIncrease + inputs.marginIncrease) / 100),
        ),
      );

  return {
    preparationMinutes,
    peakPreparationMinutes,
    kitchenCapacity,
    customerSatisfaction,
    estimatedRevenue,
  };
}
