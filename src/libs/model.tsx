export abstract class Nodeable {
	abstract get node(): string;
	abstract get label(): string;
}

export class Tag extends Nodeable {
	constructor(
		public name: string,
		public readonly id: number,
	) {
		super();
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
	) {
		super();
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
	) {
		super();
	}

	override get node() {
		return `idea-${this.id}`;
	}

	override get label() {
		return this.name;
	}
}

export type Root = Tag | User;
