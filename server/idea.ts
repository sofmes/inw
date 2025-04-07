import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { Env } from ".";

export const idea = new Hono<Env>();

const route = idea
	.get(
		"/",
		zValidator(
			"query",
			z.object({
				tagId: z.string().transform(Number),
			}),
		),
		async c => {
			const { tagId } = c.req.valid("query");
			const data = await c.var.data.idea.getByTag(tagId);

			return c.json(data);
		},
	)
	.get(
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

			if (!value) return c.body(null, 404);

			return c.json(value);
		},
	)
	.post(
		"/",
		zValidator(
			"json",
			z.object({
				name: z.string().max(100),
				description: z.string().max(2000),
				authorId: z.string(),
				tags: z.array(z.string().max(100)).max(30),
			}),
		),
		async c => {
			const data = c.req.valid("json");
			const result = await c.var.data.idea.set(data);

			return c.json(result);
		},
	)
	.delete(
		"/:id",
		zValidator(
			"param",
			z.object({
				id: z.string().transform(Number),
			}),
		),
		async c => {
			const { id } = c.req.valid("param");
			const result = await c.var.data.idea.delete(id);
			if (!result) return c.status(404);

			return c.body(null);
		},
	);

export type IdeaRoute = typeof route;
