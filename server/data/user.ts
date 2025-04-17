import { eq } from "drizzle-orm";
import { users } from "../../database/schema";
import type { Database } from "../index";

export interface UserData {
	id: string;
	name: string;
	email: string;
	image?: string;
	description?: string;
}

export class UserDataManager {
	constructor(private db: Database) {}

	async createOrUpdateUser(user: UserData) {
		try {
			console.log("createOrUpdateUser: 開始", {
				id: user.id,
				name: user.name,
				email: user.email,
			});

			// メールアドレスで検索
			const existingUser = await this.db
				.select()
				.from(users)
				.where(eq(users.email, user.email))
				.get();

			console.log(
				"createOrUpdateUser: 既存ユーザー検索結果:",
				existingUser,
			);

			if (existingUser) {
				console.log("createOrUpdateUser: 既存ユーザーを更新します");
				await this.db
					.update(users)
					.set({
						id: user.id,
						name: user.name,
						email: user.email,
						image: user.image,
						description: existingUser.description, // 既存のdescriptionを保持
						updatedAt: new Date(),
					})
					.where(eq(users.email, user.email));

				return this.getUserById(user.id);
			}

			console.log("createOrUpdateUser: 新規ユーザーを作成します");
			await this.db.insert(users).values({
				id: user.id,
				name: user.name,
				email: user.email,
				image: user.image,
				description: "", // 新規ユーザーの場合は空文字列
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			const newUser = await this.getUserById(user.id);
			console.log("createOrUpdateUser: 新規ユーザー作成結果:", newUser);
			return newUser;
		} catch (error) {
			console.error("createOrUpdateUser: エラーが発生しました:", error);
			if (error instanceof Error) {
				console.error("エラーの詳細:", error.message);
				console.error("エラーのスタックトレース:", error.stack);
			}
			return null;
		}
	}

	async getUserById(id: string) {
		try {
			console.log("getUserById: 検索開始, ID:", id);
			const query = this.db.select().from(users).where(eq(users.id, id));

			console.log("getUserById: 実行するSQLクエリ:", query.toSQL());

			const result = await query.get();
			console.log("getUserById: 検索結果:", result);

			if (!result) {
				console.log("getUserById: ユーザーが見つかりませんでした");
			}

			return result;
		} catch (error) {
			console.error("Error in getUserById:", error);
			if (error instanceof Error) {
				console.error("エラーの詳細:", error.message);
				console.error("エラーのスタックトレース:", error.stack);
			}
			return null;
		}
	}

	async updateUser(id: string, data: Partial<UserData>) {
		try {
			await this.db
				.update(users)
				.set({
					...data,
					updatedAt: new Date(),
				})
				.where(eq(users.id, id));

			return this.getUserById(id);
		} catch (error) {
			console.error("Error in updateUser:", error);
			return null;
		}
	}
}
