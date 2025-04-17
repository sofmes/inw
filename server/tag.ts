import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { Env } from ".";

export const tag = new Hono<Env>();

const route = tag
	.get(
		"/",
		zValidator("query", z.object({ page: z.string().transform(Number) })),
		async c => {
			const { page } = c.req.valid("query");
			const data = await c.var.data.tag.getMultiple(page, 2);

			return c.json(data);
		},
	)
	.get(
		"/:id",
		zValidator("param", z.object({ id: z.string().transform(Number) })),
		async c => {
			const { id } = c.req.valid("param");
			const value = await c.var.data.tag.get(id);
			if (!value) return c.body(null, 404);

			return c.text(value?.toString());
		},
	)
	.post(
		"/",
		zValidator("json", z.object({ name: z.string().min(1).max(100) })),
		async c => {
			const { name } = c.req.valid("json");

			const id = await c.var.data.tag.set(name);
			c.status(201);

			return c.json({ id });
		},
	)
	.delete(
		"/:id",
		zValidator("param", z.object({ id: z.string().transform(Number) })),
		async c => {
			const { id } = c.req.valid("param");
			const result = await c.var.data.tag.delete(id);
			if (!result) c.status(404);

			return c.body(null);
		},
	);

export type TagRoute = typeof route;
