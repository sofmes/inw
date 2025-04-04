import type { Database } from "../";

export interface User {
	id: number;
	name: string;
	bio: string;
}

export class UserDataManager {
	constructor(private readonly db: Database) {}
}
