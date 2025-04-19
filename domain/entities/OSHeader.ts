import { z } from "zod";

export const OSHeader = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.enum(["plant", "fertigation", "production", "supply"]),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

