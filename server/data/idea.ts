import { eq } from "drizzle-orm";
import { ideaTable } from "~/database/schema";
import type { Database } from "../";
import type { TagData, TagDataManager } from "./tag";
import type { User } from "./user";

export interface IdeaData {
	id: number;
	author: User;
	name: string;
	description: string;
	tags: TagData[];
}

export class IdeaDataManager {
	constructor(
		private readonly db: Database,
		private readonly tag: TagDataManager,
	) {}

	async get(id: number): Promise<IdeaData | undefined> {
		const result = await this.db.query.ideaTable.findFirst({
			where: eq(ideaTable.id, id),
			with: { author: true },
		});
		if (!result) return;

		const tags = [];
		for (const tagId of result.tagIds) {
			const name = await this.tag.get(tagId);
			if (name) {
				tags.push({ name, id: tagId });
			}
		}

		return {
			tags,
			...result,
		};
	}

	async set(value: {
		name: string;
		authorId: number;
		description: string;
		tags: string[];
	}): Promise<number> {
		// 指定されたタグが全て存在するか確認し、存在しなければ作る。
		const tagIds = [];

		for (const tag of value.tags) {
			let id = await this.tag.getId(tag);

			if (!id) {
				id = await this.tag.set(tag);
			}

			tagIds.push(id);
		}

		const data = await this.db
			.insert(ideaTable)
			.values({
				tagIds,
				...value,
			})
			.returning();

		return data[0].id;
	}

	async delete(id: number): Promise<boolean> {
		const result = await this.db
			.delete(ideaTable)
			.where(eq(ideaTable.id, id))
			.limit(1)
			.returning();

		return result.length > 0;
	}
}
