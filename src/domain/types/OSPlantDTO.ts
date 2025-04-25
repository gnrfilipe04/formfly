import { OSPlant } from "../entities/OSPlant";
import { z } from "zod";

export type OSPlantDTO = z.infer<typeof OSPlant>;
