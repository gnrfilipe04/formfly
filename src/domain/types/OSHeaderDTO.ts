import { OSHeader } from "../entities/OSHeader";
import { z } from "zod";

export type OSHeaderDTO = z.infer<typeof OSHeader>;
