import { getToken } from "@auth/core/jwt";
import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { createStorage } from "unstorage";
import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";
import * as schema from "../database/schema";
import { authRoutes } from "./auth";
import { DataManager } from "./data";
import { IdeaDataManager } from "./data/idea";
import { TagDataManager } from "./data/tag";
import { UserDataManager } from "./data/user";
import { idea } from "./idea";
import { tag } from "./tag";
import { usersRouter } from "./users";

export type Env = {
	Variables: {
		data: DataManager;
		auth: {
			getSession: () => Promise<{
				user?: {
					id?: string;
					name?: string | null;
					email?: string | null;
					image?: string | null;
					description?: string;
				};
			} | null>;
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
		getSession: async () => {
			const cookie = c.req.raw.headers.get("cookie");
			if (!cookie) return null;

			try {
				const token = await getToken({
					req: c.req.raw,
					secret: c.env.AUTH_SECRET,
				});

				if (!token?.sub) return null;

				const userData = new UserDataManager(
					drizzle(c.env.DB, { schema }),
				);
				const user = await userData.getUserById(token.sub);

				if (!user) return null;

				return {
					user: {
						id: token.sub,
						name: token.name as string | null,
						email: token.email as string | null,
						image: token.picture as string | null,
						description: user.description || undefined,
					},
				};
			} catch (error) {
				console.error("Error parsing session:", error);
				return null;
			}
		},
	});

	await next();
});

app.get("/ping", c => c.text("pong"));

app.route("/tag", tag);
app.route("/idea", idea);
app.route("/auth", authRoutes);
app.route("/users", usersRouter);

export default app;
