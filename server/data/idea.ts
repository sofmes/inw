import { eq, like } from "drizzle-orm";
import { ideaTable } from "~/database/schema";
import type { Database } from "../";
import type { TagData, TagDataManager } from "./tag";
import type { UserData } from "./user";

export interface IdeaData {
	id: number;
	author: UserData;
	name: string;
	description: string;
	tags: TagData[];
}

export class IdeaDataManager {
	constructor(
		private readonly db: Database,
		private readonly tag: TagDataManager,
	) {}

	async mapTag(
		raw: Omit<IdeaData, "tags"> & { tagIds: number[] },
	): Promise<IdeaData> {
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

	async get(id: number): Promise<IdeaData | undefined> {
		const result = await this.db.query.ideaTable.findFirst({
			where: eq(ideaTable.id, id),
			with: { author: true },
		});
		if (!result) return;

		return await this.mapTag(result);
	}

	async getByTag(tagId: number): Promise<IdeaData[]> {
		const result = await this.db.query.ideaTable.findMany({
			where: like(ideaTable.tagIds, `%${tagId}%`),
			with: { author: true },
		});

		const data = [];
		for (const raw of result) {
			data.push(await this.mapTag(raw));
		}

		return data;
	}

	async set(value: {
		name: string;
		authorId: number;
		description: string;
		tags: string[];
	}): Promise<{ id: number; tags: TagData[] }> {
		// 指定されたタグが全て存在するか確認し、存在しなければ作る。
		const tags = [];

		for (const tag of value.tags) {
			let id = await this.tag.getId(tag);

			if (!id) {
				id = await this.tag.set(tag);
			}

			tags.push({ id, name: tag });
		}

		const data = await this.db
			.insert(ideaTable)
			.values({
				tagIds: tags.map(tag => tag.id),
				...value,
			})
			.returning();

		return { id: data[0].id, tags };
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
