import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { Env } from ".";

export const tag = new Hono<Env>();

tag.get(
	"/:id",
	zValidator("param", z.object({ id: z.string().transform(Number) })),
	async c => {
		const { id } = c.req.valid("param");
		const value = await c.var.data.tag.get(id);

		if (value) {
			return c.text(value?.toString());
		}

		return c.notFound();
	},
);

tag.post(
	"/",
	zValidator("json", z.object({ name: z.string().min(1).max(100) })),
	async c => {
		const { name } = c.req.valid("json");

		const id = await c.var.data.tag.set(name);
		c.status(201);

		return c.json({ id });
	},
);

tag.delete(
	"/:id",
	zValidator("param", z.object({ id: z.string().transform(Number) })),
	async c => {
		const { id } = c.req.valid("param");
		const wrote = await c.var.data.tag.delete(id);

		return wrote ? c.body(null) : c.notFound();
	},
);
