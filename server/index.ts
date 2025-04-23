import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { createStorage } from "unstorage";
import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";
import * as schema from "../database/schema";
import { authApp } from "./auth";
import { DataManager } from "./data";
import { IdeaDataManager } from "./data/idea";
import { TagDataManager } from "./data/tag";
import { UserDataManager } from "./data/user";
import { type Session, assertSession, getSession } from "./helper/user";
import { ideaApp } from "./idea";
import { tagApp } from "./tag";
import { usersApp } from "./user";

export type Env = {
	Variables: {
		data: DataManager;
		auth: {
			getSession: () => Promise<Session | null>;
			assertSession: () => Promise<Session>;
		};
	};
	Bindings: {
		DB: D1Database;
		tag_name: KVNamespace;
		tag_id: KVNamespace;
		AUTH_SECRET: string;
	};
};

export type Database = DrizzleD1Database<typeof schema>;
const app = new Hono<Env>().basePath("/api");

app.use(async (c, next) => {
	const db = drizzle(c.env.DB, { schema });
	const tagNameKv = createStorage({
		driver: cloudflareKVBindingDriver({ binding: c.env.tag_name }),
	});
	const tagIdKv = createStorage({
		driver: cloudflareKVBindingDriver({ binding: c.env.tag_id }),
	});

	const tagData = new TagDataManager(db, tagNameKv, tagIdKv);
	const ideaData = new IdeaDataManager(db, tagData);
	const userData = new UserDataManager(db);

	c.set("data", new DataManager(ideaData, tagData, userData));
	c.set("auth", {
		getSession: async () => await getSession(c),
		assertSession: async () => await assertSession(c),
	});

	await next();
});

app.get("/ping", c => c.text("pong"));

app.route("/tag", tagApp);
app.route("/idea", ideaApp);
app.route("/auth", authApp);
app.route("/users", usersApp);

export default app;
