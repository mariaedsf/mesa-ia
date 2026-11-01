import "server-only";
import type { ActionStatus, DiagnosticRecommendation, PlanAction } from "../domain/action-plan";
import type { PersistedAppState } from "../domain/app-state";
import type { SimulationInputs, SimulationResults } from "../domain/simulation";
import type { AppStateRepository } from "./ports/app-state-repository";

export class AppStateService {
  constructor(private readonly repository: AppStateRepository) {}

  getState(restaurantId: string | null): Promise<PersistedAppState> {
    return this.repository.getState(restaurantId);
  }

  getActionPlans(restaurantId: string | null): Promise<PlanAction[]> {
    return this.repository.getActionPlans(restaurantId);
  }

  setRecommendationCompleted(restaurantId: string, id: string, value: boolean): Promise<void> {
    return this.repository.setRecommendationCompleted(restaurantId, id, value);
  }

  setActionStatus(restaurantId: string, id: string, value: ActionStatus): Promise<void> {
    return this.repository.setActionStatus(restaurantId, id, value);
  }

  addDiagnosticRecommendation(
    restaurantId: string,
    recommendation: DiagnosticRecommendation,
  ): Promise<boolean> {
    return this.repository.addDiagnosticRecommendation(restaurantId, recommendation);
  }

  saveSimulation(
    restaurantId: string,
    inputs: SimulationInputs,
    results: SimulationResults,
  ): Promise<void> {
    return this.repository.saveSimulation(restaurantId, inputs, results);
  }
}
