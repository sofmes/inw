import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { users } from "../database/schema";
import type { Env } from "./index";

const usersRouter = new Hono<Env>();

// ユーザー情報を取得する関数
async function getUserById(id: string, db: D1Database) {
	try {
		console.log("ユーザーID:", id);
		const drizzleDb = drizzle(db);
		const query = drizzleDb.select().from(users).where(eq(users.id, id));

		console.log("実行するSQLクエリ:", query.toSQL());

		const user = await query.get();
		console.log("取得したユーザー:", user);

		if (!user) {
			console.log("ユーザーが見つかりませんでした");
		}

		return user;
	} catch (error) {
		console.error("ユーザー取得エラー:", error);
		if (error instanceof Error) {
			console.error("エラーの詳細:", error.message);
			console.error("エラーのスタックトレース:", error.stack);
		}
		return null;
	}
}

// ユーザー詳細取得
usersRouter.get("/:id", async c => {
	try {
		const userId = c.req.param("id");
		const session = await c.var.auth.getSession();

		if (!session?.user) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		if (session.user.id !== userId) {
			return c.json({ error: "Forbidden" }, 403);
		}

		const user = await getUserById(userId, c.env.DB);
		if (!user) {
			return c.json({ error: "User not found" }, 404);
		}

		return c.json(user);
	} catch (error) {
		return c.json({ error: "Internal server error" }, 500);
	}
});

// ユーザー情報更新
usersRouter.put("/:id", async c => {
	try {
		const userId = c.req.param("id");
		const session = await c.var.auth.getSession();

		if (!session?.user) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		if (session.user.id !== userId) {
			return c.json({ error: "Forbidden" }, 403);
		}

		const data = await c.req.json();

		// ユーザーが存在しない場合は新規作成
		const existingUser = await getUserById(userId, c.env.DB);
		if (!existingUser) {
			const newUser = await c.var.data.user.createOrUpdateUser({
				id: userId,
				name: session.user.name || "",
				email: session.user.email || "",
				image: session.user.image || "",
				description: data.description || "",
			});
			if (!newUser) {
				return c.json({ error: "Failed to create user" }, 500);
			}
			return c.json(newUser);
		}

		const updatedUser = await c.var.data.user.updateUser(userId, data);
		if (!updatedUser) {
			return c.json({ error: "User not found" }, 404);
		}

		return c.json(updatedUser);
	} catch (error) {
		console.error("Error in PUT /users/:id:", error);
		return c.json({ error: "Internal server error" }, 500);
	}
});

export { usersRouter };
