import { OSFertigation } from "../entities/OSFertigation";
import { z } from "zod";

export type OSFertigationDTO = z.infer<typeof OSFertigation>;
