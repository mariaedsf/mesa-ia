import "server-only";
import { eq, ne } from "drizzle-orm";
import type { ActionStatus, DiagnosticRecommendation, PlanAction } from "../../domain/action-plan";
import type { PersistedAppState } from "../../domain/app-state";
import type { SimulationInputs, SimulationResults } from "../../domain/simulation";
import type { AppStateRepository } from "../../application/ports/app-state-repository";
import { db } from "../database/client";
import {
  actionPlans,
  diagnosticPlanItems,
  recommendationStates,
  simulationRuns,
} from "../database/schema";

export class DrizzleAppStateRepository implements AppStateRepository {
  async getState(restaurantId: string | null): Promise<PersistedAppState> {
    if (!restaurantId) return { completedRecommendationIds: [], diagnosticPlanIds: [] };
    const recommendationPrefix = `${restaurantId}:`;
    const [recommendations, diagnosticPlans] = await Promise.all([
      db.select().from(recommendationStates).all(),
      db.select().from(diagnosticPlanItems).all(),
    ]);

    return {
      completedRecommendationIds: recommendations
        .filter(({ id, completed }) => completed && id.startsWith(recommendationPrefix))
        .map(({ id }) => id.slice(recommendationPrefix.length)),
      diagnosticPlanIds: diagnosticPlans.map(
        ({ recommendationId }) => recommendationId.startsWith(recommendationPrefix)
          ? recommendationId.slice(recommendationPrefix.length)
          : "",
      ).filter(Boolean),
    };
  }

  async getActionPlans(restaurantId: string | null): Promise<PlanAction[]> {
    if (!restaurantId) return [];
    const rows = await db
      .select()
      .from(actionPlans)
      .where(ne(actionPlans.source, "seed"))
      .all();
    const diagnosticPrefix = `diagnostic-${restaurantId}-`;
    const simulationPrefix = `simulation-${restaurantId}-`;

    return rows
      .filter(({ id }) => id.startsWith(diagnosticPrefix) || id.startsWith(simulationPrefix))
      .map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      responsible: row.responsible,
      role: row.role,
      initials: row.initials,
      due: row.due,
      day: row.day,
      date: row.date,
      time: row.time,
      status: row.status,
      icon: row.icon,
      overdue: row.overdue,
      }));
  }

  async setRecommendationCompleted(restaurantId: string, id: string, value: boolean): Promise<void> {
    const stateId = `${restaurantId}:${id}`;
    await db
      .insert(recommendationStates)
      .values({ id: stateId, completed: value })
      .onConflictDoUpdate({
        target: recommendationStates.id,
        set: { completed: value },
      });
  }

  async setActionStatus(restaurantId: string, id: string, value: ActionStatus): Promise<void> {
    if (!id.startsWith(`diagnostic-${restaurantId}-`) && !id.startsWith(`simulation-${restaurantId}-`)) {
      throw new Error("Plano de ação não pertence ao restaurante selecionado.");
    }
    await db
      .update(actionPlans)
      .set({ status: value, overdue: false })
      .where(eq(actionPlans.id, id));
  }

  async addDiagnosticRecommendation(
    restaurantId: string,
    recommendation: DiagnosticRecommendation,
  ): Promise<boolean> {
    const recommendationId = `${restaurantId}:${recommendation.id}`;
    const inserted = await db
      .insert(diagnosticPlanItems)
      .values({ recommendationId, createdAt: new Date() })
      .onConflictDoNothing();

    if (inserted.changes === 0) {
      return false;
    }

    await db
      .insert(actionPlans)
      .values({
        id: `diagnostic-${restaurantId}-${recommendation.id}`,
        title: recommendation.title,
        description: recommendation.description,
        responsible: "Não atribuído",
        role: "Definir responsável",
        initials: "—",
        due: "A definir",
        day: "Planejar",
        date: "A definir",
        time: "A definir",
        status: "pending",
        icon: "chart",
        overdue: false,
        source: "diagnostic",
      })
      .onConflictDoNothing();

    return true;
  }

  async saveSimulation(
    restaurantId: string,
    inputs: SimulationInputs,
    results: SimulationResults,
  ): Promise<void> {
    const run = await db
      .insert(simulationRuns)
      .values({ inputs, results, createdAt: new Date() });

    await db.insert(actionPlans).values({
      id: `simulation-${restaurantId}-${run.lastInsertRowid}`,
      title: "Aplicar cenário simulado",
      description: `Cenário com ${inputs.teamSize} pessoas e ${inputs.ordersPerHour} pedidos por hora. Preparo estimado em ${results.preparationMinutes} min.`,
      responsible: "Não atribuído",
      role: "Definir responsável",
      initials: "—",
      due: "A definir",
      day: "Planejar",
      date: "A definir",
      time: "A definir",
      status: "pending",
      icon: "chart",
      overdue: false,
      source: "simulation",
    });
  }
}
