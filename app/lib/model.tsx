import type { IdeaData } from "server/data/idea";
import type { TagData } from "server/data/tag";
import type { UserData } from "server/data/user";

export abstract class Nodeable {
	abstract get node(): string;
	abstract get label(): string;
}

export class Notice extends Nodeable {
	constructor(public readonly name: string) {
		super();
	}

	override get node(): string {
		return `notice-${this.name}`;
	}

	override get label() {
		return this.name;
	}
}

export class Trigger extends Nodeable {
	constructor(
		public readonly name: string,
		public onClick?: () => void,
	) {
		super();
	}

	override get node(): string {
		return `trigger-${this.name}`;
	}

	override get label(): string {
		return this.name;
	}
}

export class Tag extends Nodeable {
	constructor(
		public readonly name: string,
		public readonly id: number,
	) {
		super();
	}

	static fromData(data: TagData) {
		return new Tag(data.name, data.id);
	}

	override get node() {
		return `tag-${this.id}`;
	}

	override get label() {
		return this.name;
	}
}

export class User extends Nodeable {
	constructor(
		public name: string,
		public readonly id: number,
		public bio: string,
		public iconUrl: string | null,
	) {
		super();
	}

	static fromData(data: UserData) {
		return new User(data.name, data.id, data.bio, data.iconUrl);
	}

	override get node() {
		return `user-${this.id}`;
	}

	override get label() {
		return this.name;
	}
}

export class Idea extends Nodeable {
	constructor(
		public name: string,
		public readonly id: number,
		public tags: Tag[],
		public description: string,
		public author: User,
	) {
		super();
	}

	static fromData(data: IdeaData) {
		return new Idea(
			data.name,
			data.id,
			data.tags.map(tag => Tag.fromData(tag)),
			data.description,
			User.fromData(data.author),
		);
	}

	override get node() {
		return `idea-${this.id}`;
	}

	override get label() {
		return this.name;
	}
}

export type Root = Tag | User | Notice;
