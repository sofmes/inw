import type { Database } from "../";

export interface UserData {
	id: number;
	iconUrl: string | null;
	name: string;
	bio: string;
}

export class UserDataManager {
	constructor(private readonly db: Database) {}
}
