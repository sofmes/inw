import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { type Storage, type StorageValue, createStorage } from "unstorage";
import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";
import { tag } from "./tag";

export type Env = {
	Variables: {
		db: DrizzleD1Database;
		tagCache: Storage<StorageValue>;
	};
	Bindings: { DB: D1Database; tag: KVNamespace };
};

const app = new Hono<Env>().basePath("/api");

app.use(async (c, next) => {
	c.set("db", drizzle(c.env.DB));
	c.set(
		"tagCache",
		createStorage({
			driver: cloudflareKVBindingDriver({ binding: c.env.tag }),
		}),
	);

	await next();
});

app.get("/ping", c => c.text("pong"));

app.route("/tag", tag);

export default app;
