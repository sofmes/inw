import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { Storage, StorageValue } from "unstorage";
import { tagTable } from "~/database/schema";

export interface TagData {
	id: number;
	name: string;
}

export class TagDataManager {
	constructor(
		private readonly db: DrizzleD1Database,
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

	async set(name: string): Promise<number> {
		const row = await this.db.insert(tagTable).values({ name }).returning();
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
				.delete(tagTable)
				.where(eq(tagTable.id, id))
				.limit(1)
				.returning();
			await this.nameKv.remove(stringId);
			await this.idKv.remove(name.toString());

			return true;
		}

		return false;
	}
}
