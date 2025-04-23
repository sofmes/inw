import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { userTable } from "../database/schema";
import type { Env } from "./index";

export const usersApp = new Hono<Env>();

// ユーザー情報を取得する関数
async function getUserById(id: string, db: D1Database) {
	try {
		console.log("ユーザーID:", id);
		const drizzleDb = drizzle(db);
		const query = drizzleDb
			.select()
			.from(userTable)
			.where(eq(userTable.id, id));

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

const usersRoute = usersApp
	// ユーザー詳細取得
	.get("/", async c => {
		const session = await c.var.auth.assertSession();
		const user = await getUserById(session.id, c.env.DB);
		if (!user) throw new HTTPException(404);

		return c.json(user);
	})
	// ユーザー情報更新
	.put("/", async c => {
		const session = await c.var.auth.assertSession();
		const data = await c.req.json();

		const user = c.var.data.user.getUserById(session.id);
		if (!user) throw new HTTPException(400);

		const updatedUser = await c.var.data.user.updateUser(session.id, data);
		if (!updatedUser) throw new HTTPException(400);

		return c.json(updatedUser);
	});

export type UsersRoute = typeof usersRoute;
