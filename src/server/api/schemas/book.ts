import { z } from "zod";

export const bookSchema = z.object({
  title: z.string(),
  description: z.string(),
  categoryId: z.string(),
  pages: z.string(),
  price: z.string(),
  image: z.string(),
  author: z.string(),
  createdById: z.string(),
});

export const bookParamsSchema = z.object({
  id: z.string(),
});

export type BookType = z.infer<typeof bookSchema>;
export type BookParamsType = z.infer<typeof bookParamsSchema>;
