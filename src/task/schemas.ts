import { z } from "zod";
import { categorySchema } from "../categories/schemas";

export const taskSchema = z.object({
	id: z.number().int().positive(),
	title: z.string().max(20),
	content: z.string().max(20),
	finished: z.boolean(),
	categoryId: z.number().int().positive().nullish(),
});

export const taskCreateSchema = taskSchema.omit({
	id: true,
	finished: true,
});

export const taskUpdateSchema = taskSchema.omit({ id: true });
export const taskReturnSchema = taskSchema
	.omit({ categoryId: true })
	.extend({ category: categorySchema.nullish() });
