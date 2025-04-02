import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { createStorage } from "unstorage";
import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";
import { DataManager } from "./data";
import { IdeaDataManager } from "./data/idea";
import { TagDataManager } from "./data/tag";
import { idea } from "./idea";
import { tag } from "./tag";

export type Env = {
	Variables: {
		data: DataManager;
	};
	Bindings: { DB: D1Database; tag_name: KVNamespace; tag_id: KVNamespace };
};

const app = new Hono<Env>().basePath("/api");

app.use(async (c, next) => {
	const db = drizzle(c.env.DB);
	const tagNameKv = createStorage({
		driver: cloudflareKVBindingDriver({ binding: c.env.tag_name }),
	});
	const tagIdKv = createStorage({
		driver: cloudflareKVBindingDriver({ binding: c.env.tag_id }),
	});

	const tagData = new TagDataManager(db, tagNameKv, tagIdKv);
	const ideaData = new IdeaDataManager(db, tagData);

	c.set("data", new DataManager(ideaData, tagData));

	await next();
});

app.get("/ping", c => c.text("pong"));

app.route("/tag", tag);
app.route("/idea", idea);

export default app;
