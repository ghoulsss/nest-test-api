import { z } from 'zod';

export const MovieRequestSchema = z.object({
  title: z.string(),
  year: z.number(),
});

export const MovieResponseSchema = z.object({
  title: z.string(),
  year: z.number(),
});

export type MovieRequestSchema = z.infer<typeof MovieRequestSchema>;
export type MovieResponseSchema = z.infer<typeof MovieResponseSchema>;
