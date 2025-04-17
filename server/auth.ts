import { Auth } from "@auth/core";
import Google from "@auth/core/providers/google";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import * as schema from "../database/schema";
import { UserDataManager } from "./data/user";
import type { Database } from "./index";

declare module "@auth/core" {
	interface Session {
		user?: {
			id?: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			description?: string;
		};
	}

	interface JWT {
		id: string;
	}
}

type Env = {
	Bindings: {
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
		AUTH_SECRET: string;
		DB: D1Database;
	};
};

export const authRoutes = new Hono<Env>();
authRoutes.all("/*", async c => {
	const db = drizzle(c.env.DB, { schema }) as Database;
	const userData = new UserDataManager(db);

	const response = await Auth(c.req.raw, {
		providers: [
			Google({
				clientId: c.env.GOOGLE_CLIENT_ID,
				clientSecret: c.env.GOOGLE_CLIENT_SECRET,
			}),
		],
		secret: c.env.AUTH_SECRET,
		trustHost: true,
		basePath: "/api/auth",
		session: {
			maxAge: 30 * 24 * 60 * 60, // 30日間
			updateAge: 24 * 60 * 60, // 24時間ごとに更新
		},
		callbacks: {
			// セッションコールバック
			session: async ({ session, token }) => {
				try {
					if (session?.user && token?.sub) {
						console.log("Setting session for user:", token.sub);
						session.user = {
							...session.user,
							id: token.sub,
						};
					}
					return session;
				} catch (error) {
					console.error("Error in session callback:", error);
					return session;
				}
			},
			// サインインコールバック
			signIn: async ({ user, account, profile }) => {
				try {
					if (!user.id) {
						console.error("User ID is missing");
						return false;
					}

					console.log("サインイン試行 - ユーザーID:", user.id);
					console.log("サインイン試行 - ユーザー情報:", {
						name: user.name,
						email: user.email,
						image: user.image,
					});

					// ユーザーが既に存在するか確認
					const existingUser = await userData.getUserById(user.id);
					console.log(
						"既存ユーザーの確認結果:",
						existingUser ? "存在する" : "存在しない",
					);

					if (existingUser) {
						console.log(
							"既存ユーザーが見つかりました:",
							existingUser.id,
						);
						return true;
					}

					// ユーザーデータをD1に保存
					console.log("新規ユーザーを作成します");
					const result = await userData.createOrUpdateUser({
						id: user.id,
						name: user.name || "",
						email: user.email || "",
						image: user.image || "",
						description: "",
					});

					if (!result) {
						console.error("ユーザー作成に失敗しました");
						return false;
					}

					console.log("ユーザー作成成功:", result.id);
					return true;
				} catch (error) {
					console.error("サインインコールバックでエラー:", error);
					if (error instanceof Error) {
						console.error("エラーの詳細:", error.message);
						console.error("エラーのスタックトレース:", error.stack);
					}
					return false;
				}
			},
			// JWTコールバック
			jwt: async ({ token, user, account, profile }) => {
				try {
					if (user) {
						token = {
							...token,
							sub: user.id,
							email: user.email,
							name: user.name,
							image: user.image,
						};
					}
					return token;
				} catch (error) {
					console.error("Error in jwt callback:", error);
					return token;
				}
			},
		},
	});

	return response;
});
