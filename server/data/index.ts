import type { IdeaDataManager } from "./idea";
import type { TagDataManager } from "./tag";

export class DataManager {
	constructor(
		public readonly idea: IdeaDataManager,
		public readonly tag: TagDataManager,
	) {}
}
