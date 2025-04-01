import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { tagTable } from "~/database/schema";
import type { Env } from ".";

const tag = new Hono<Env>();

tag.get("/:id", async c => {
	const value = await c.var.tagCache.get(c.req.param("id"));

	if (value) {
		return c.text(value?.toString());
	}

	return c.notFound();
});

tag.post(
	"/",
	zValidator("json", z.object({ name: z.string().min(1).max(100) })),
	async c => {
		const { name } = c.req.valid("json");

		const row = await c.var.db
			.insert(tagTable)
			.values({ name })
			.returning();
		await c.var.tagCache.set(row[0].id.toString(), name);

		c.status(201);

		return c.json({ id: row[0].id });
	},
);

tag.delete("/:id", async c => {
	const id = c.req.param("id");
	const has = await c.var.tagCache.has(id);

	if (has) {
		await c.var.db
			.delete(tagTable)
			.where(eq(tagTable.id, Number.parseInt(id)))
			.limit(1)
			.returning();
		await c.var.tagCache.remove(id);

		return c.body(null);
	} else {
		return c.notFound();
	}
});

export { tag };
