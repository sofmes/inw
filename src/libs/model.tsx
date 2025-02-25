export abstract class Nodeable {
	abstract get node(): string;
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
}
