import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { ideaTable } from "~/database/schema";
import type { TagData, TagDataManager } from "./tag";

export interface IdeaData {
	id: number;
	name: string;
	description: string;
	tags: TagData[];
}

export class IdeaDataManager {
	constructor(
		private readonly db: DrizzleD1Database,
		private readonly tag: TagDataManager,
	) {}

	async get(id: number): Promise<IdeaData | undefined> {
		const raw = await this.db
			.select()
			.from(ideaTable)
			.where(eq(ideaTable.id, id))
			.limit(1)
			.get();
		if (!raw) return;

		const tags = [];
		for (const tagId of raw.tagIds) {
			const name = await this.tag.get(tagId);
			if (name) {
				tags.push({ name, id: tagId });
			}
		}

		return {
			tags,
			...raw,
		};
	}

	async set(value: {
		name: string;
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

	async delete(id: number): Promise<void> {
		await this.db.delete(ideaTable).where(eq(ideaTable.id, id)).limit(1);
	}
}
