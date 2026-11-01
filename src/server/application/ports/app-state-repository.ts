import type {
  ActionStatus,
  DiagnosticRecommendation,
  PlanAction,
} from "../../domain/action-plan";
import type { PersistedAppState } from "../../domain/app-state";
import type {
  SimulationInputs,
  SimulationResults,
} from "../../domain/simulation";

export interface AppStateRepository {
  getState(restaurantId: string | null): Promise<PersistedAppState>;
  getActionPlans(restaurantId: string | null): Promise<PlanAction[]>;
  setRecommendationCompleted(restaurantId: string, id: string, value: boolean): Promise<void>;
  setActionStatus(restaurantId: string, id: string, value: ActionStatus): Promise<void>;
  addDiagnosticRecommendation(
    restaurantId: string,
    recommendation: DiagnosticRecommendation,
  ): Promise<boolean>;
  saveSimulation(
    restaurantId: string,
    inputs: SimulationInputs,
    results: SimulationResults,
  ): Promise<void>;
}
