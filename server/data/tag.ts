import { asc, eq } from "drizzle-orm";
import type { Storage, StorageValue } from "unstorage";
import { tag } from "~/database/schema";
import type { Database } from "../";

export interface TagData {
	id: number;
	name: string;
}

export class TagDataManager {
	constructor(
		private readonly db: Database,
		private readonly nameKv: Storage<StorageValue>,
		private readonly idKv: Storage<StorageValue>,
	) {}

	async has(id: number): Promise<boolean> {
		return await this.nameKv.has(id.toString());
	}

	async used(name: string): Promise<boolean> {
		return await this.idKv.has(name);
	}

	async getId(name: string): Promise<number | undefined> {
		const value = await this.idKv.get(name);
		if (!value) return;

		return Number.parseInt(value.toString());
	}

	async get(id: number): Promise<string | undefined> {
		const data = await this.nameKv.get(id.toString());
		if (!data) return;

		return data.toString();
	}

	async getMultiple(page: number, n: number): Promise<TagData[]> {
		return await this.db.query.tag.findMany({
			orderBy: [asc(tag.id)],
			limit: n,
			offset: n * (page - 1),
		});
	}

	async set(name: string): Promise<number> {
		const row = await this.db.insert(tag).values({ name }).returning();
		const stringId = row[0].id.toString();

		await this.nameKv.set(stringId, name);
		await this.idKv.set(name, stringId);

		return row[0].id;
	}

	async delete(id: number): Promise<boolean> {
		const stringId = id.toString();
		const name = await this.nameKv.get(stringId);

		if (name) {
			await this.db
				.delete(tag)
				.where(eq(tag.id, id))
				.limit(1)
				.returning();
			await this.nameKv.remove(stringId);
			await this.idKv.remove(name.toString());

			return true;
		}

		return false;
	}
}
