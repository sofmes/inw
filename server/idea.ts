import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import type { Env } from ".";

export const ideaApp = new Hono<Env>();

const route = ideaApp
	.get(
		"/",
		zValidator(
			"query",
			z.object({
				tagId: z.string().transform(Number),
				page: z.string().optional().default("1").transform(Number),
			}),
		),
		async c => {
			const { tagId, page } = c.req.valid("query");
			const data = await c.var.data.idea.getByTag(tagId, page, 10);

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
				tags: z.array(z.string().max(100)).min(1).max(30),
			}),
		),
		async c => {
			await c.var.auth.assertSession();
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
			const session = await c.var.auth.assertSession();
			const { id } = c.req.valid("param");

			const idea = await c.var.data.idea.get(id);
			if (!idea) throw new HTTPException(404);
			if (idea.author.id !== session.id) throw new HTTPException(403);

			await c.var.data.idea.delete(id);

			return c.body(null);
		},
	);

export type IdeaRoute = typeof route;
