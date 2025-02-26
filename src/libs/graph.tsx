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

export class MindMapGraph {
	constructor(
		readonly graph: MultiDirectedGraph,
		readonly style: StyleStrategy,
	) {}

	addNode(obj: Nodeable) {
		if (this.graph.hasNode(obj.node)) {
			return;
		}

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
