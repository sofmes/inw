import type { MultiDirectedGraph } from "graphology";
import type { Attributes } from "graphology-types";
import { Idea, type Nodeable, type Root, Tag, Trigger, User } from "./model";

const COLORS = {
	tag: "#698aab",
	idea: "#887f7a",
	user: "#00a497",
};

export class StyleStrategy {
	getIdeaStyle(): Attributes {
		return {
			color: COLORS.idea,
		};
	}

	getTagStyle(): Attributes {
		return {
			color: COLORS.tag,
		};
	}

	getUserStyle(): Attributes {
		return {
			color: COLORS.user,
		};
	}

	getStyle(obj: Nodeable): Attributes {
		if (obj instanceof Idea) {
			return this.getIdeaStyle();
		}

		if (obj instanceof Tag) {
			return this.getTagStyle();
		}

		if (obj instanceof User) {
			return this.getUserStyle();
		}

		return {};
	}
}

class Objects {
	constructor(
		readonly ideas: Map<string, Idea>,
		readonly tags: Map<string, Tag>,
		readonly users: Map<string, User>,
		readonly triggers: Map<string, Trigger>,
		readonly others: Map<string, Nodeable>,
	) {}

	set(obj: Nodeable) {
		if (obj instanceof Idea) {
			this.ideas.set(obj.node, obj);
		} else if (obj instanceof Tag) {
			this.tags.set(obj.node, obj);
		} else if (obj instanceof User) {
			this.users.set(obj.node, obj);
		} else if (obj instanceof Trigger) {
			this.triggers.set(obj.node, obj);
		} else {
			this.others.set(obj.node, obj);
		}
	}

	getIdea(key: string): Idea | undefined {
		return this.ideas.get(key);
	}

	getTag(key: string): Tag | undefined {
		return this.tags.get(key);
	}

	getUser(key: string): User | undefined {
		return this.users.get(key);
	}

	getTrigger(key: string): Trigger | undefined {
		return this.triggers.get(key);
	}
}

export class MindMapState {
	public readonly objs: Objects;
	readonly expanded: string[];

	constructor(
		readonly graph: MultiDirectedGraph,
		readonly style: StyleStrategy,
	) {
		this.objs = new Objects(
			new Map(),
			new Map(),
			new Map(),
			new Map(),
			new Map(),
		);
		this.expanded = [];
	}

	addNode(obj: Nodeable, offset?: { x: number; y: number }) {
		if (this.graph.hasNode(obj.node)) {
			return;
		}

		this.objs.set(obj);
		this.graph.addNode(obj.node, {
			label: obj.label,
			size: 30,
			x: offset?.x ?? 0 + Math.random() * 100,
			y: offset?.y ?? 0 + Math.random() * 100,
			...this.style.getStyle(obj),
		});
	}

	addChildNode(root: Nodeable, child: Nodeable) {
		this.addNode(child);
		this.graph.addDirectedEdge(root.node, child.node);
	}

	expand(root: Nodeable, children: Nodeable[]) {
		if (this.expanded.includes(root.node)) return false;

		this.expanded.push(root.node);
		this.addNode(root);

		for (const child of children) {
			this.addChildNode(root, child);
		}

		return true;
	}

	expandWithIdeas(root: Root, children: Idea[]) {
		if (this.expanded.includes(root.node)) return false;

		this.expanded.push(root.node);
		this.addNode(root);

		for (const child of children) {
			this.addChildNode(root, child);

			// アイデアグループも展開する。
			this.expand(child, child.tags);
		}
	}
}
