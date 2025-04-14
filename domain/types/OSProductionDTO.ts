import { OSProduction } from "../entities/OSProduction";
import { z } from "zod";

export type OSProductionDTO = z.infer<typeof OSProduction>;
