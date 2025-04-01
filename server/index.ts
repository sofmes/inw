import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";

export type Env = {
	Variables: {
		db: DrizzleD1Database;
	};
	Bindings: { DB: D1Database };
};

const app = new Hono<Env>();

app.use(async (c, next) => {
	c.set("db", drizzle(c.env.DB));

	await next();
});

app.get("/ping", c => c.text("pong"));

export default app;
