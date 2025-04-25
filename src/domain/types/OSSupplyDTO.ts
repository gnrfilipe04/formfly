import { OSSupply } from "../entities/OSSupply";
import { z } from "zod";

export type OSSupplyDTO = z.infer<typeof OSSupply>;
