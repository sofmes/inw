import type { MultiDirectedGraph } from 'graphology';
import type { Attributes } from 'graphology-types';
import { Idea, type Nodeable, Tag } from './model';

const COLORS = {
	tag: '#698aab',
	idea: '#887f7a',
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

	getStyle(obj: Nodeable): Attributes {
		if (obj instanceof Idea) {
			return this.getIdeaStyle();
		}

		if (obj instanceof Tag) {
			return this.getTagStyle();
		}

		return {};
	}
}

class Objects {
	constructor(
		readonly ideas: Map<string, Idea>,
		readonly tags: Map<string, Tag>,
	) {}

	set(obj: Nodeable) {
		if (obj instanceof Idea) {
			this.ideas.set(obj.node, obj);
		} else if (obj instanceof Tag) {
			this.tags.set(obj.node, obj);
		} else {
			throw new Error(
				'指定されたオブジェクトの格納には対応していません。',
			);
		}
	}

	getIdea(key: string): Idea | undefined {
		return this.ideas.get(key);
	}

	getTag(key: string): Tag | undefined {
		return this.tags.get(key);
	}
}

export class MindMapState {
	public readonly objs: Objects;

	constructor(
		readonly graph: MultiDirectedGraph,
		readonly style: StyleStrategy,
	) {
		this.objs = new Objects(new Map(), new Map());
	}

	addNode(obj: Nodeable) {
		if (this.graph.hasNode(obj.node)) {
			return;
		}

		this.objs.set(obj);
		this.graph.addNode(obj.node, {
			label: obj.label,
			size: 50,
			x: Math.random() * 10,
			y: Math.random() * 10,
			...this.style.getStyle(obj),
		});
	}

	addChildNode(root: Nodeable, child: Nodeable) {
		this.addNode(child);
		this.graph.addDirectedEdge(root.node, child.node);
	}

	addGroup(root: Nodeable, children: Nodeable[]) {
		this.addNode(root);

		for (const child of children) {
			this.addChildNode(root, child);
		}
	}

	addTagGroup(root: Tag, children: Idea[]) {
		this.addNode(root);

		for (const child of children) {
			this.addChildNode(root, child);

			// アイデアグループも展開する。
			this.addGroup(child, child.tags);
		}
	}
}
