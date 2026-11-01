import "server-only";

import { AppStateService } from "./application/app-state-service";
import { OperationalDataService } from "./application/operational-data-service";
import { DrizzleAppStateRepository } from "./infrastructure/repositories/drizzle-app-state-repository";
import { DrizzleOperationalDataRepository } from "./infrastructure/repositories/drizzle-operational-data-repository";

export const appStateService = new AppStateService(
  new DrizzleAppStateRepository(),
);

export const operationalDataService = new OperationalDataService(
  new DrizzleOperationalDataRepository(),
);
