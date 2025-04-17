import type { IdeaDataManager } from "./idea";
import type { TagDataManager } from "./tag";
import type { UserDataManager } from "./user";

export class DataManager {
	constructor(
		public readonly idea: IdeaDataManager,
		public readonly tag: TagDataManager,
		public readonly user: UserDataManager,
	) {}
}
