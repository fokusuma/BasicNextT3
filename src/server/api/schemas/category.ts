import { z } from "zod";

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
