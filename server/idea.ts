import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { Env } from ".";

export const idea = new Hono<Env>();

idea.get(
	"/:id",
	zValidator(
		"param",
		z.object({
			id: z.string().transform(Number),
		}),
	),
	async c => {
		const { id } = c.req.valid("param");
		const value = await c.var.data.idea.get(id);

		if (!value) return c.notFound();

		return c.json(value);
	},
);

idea.post(
	"/",
	zValidator(
		"json",
		z.object({
			name: z.string().max(100),
			description: z.string().max(2000),
			tags: z.array(z.string().max(100)).max(30),
		}),
	),
	async c => {
		const data = c.req.valid("json");
		const id = await c.var.data.idea.set(data);

		return c.json({ id: id });
	},
);

idea.delete(
	"/:id",
	zValidator(
		"param",
		z.object({
			id: z.string().transform(Number),
		}),
	),
	async c => {
		const { id } = c.req.valid("param");
		await c.var.data.idea.delete(id);
	},
);
