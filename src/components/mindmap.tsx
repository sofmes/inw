import { SigmaContainer } from '@react-sigma/core';
import { useWorkerLayoutForce } from '@react-sigma/layout-force';
import { MultiDirectedGraph } from 'graphology';
import { useEffect } from 'react';
import type { NodeHoverDrawingFunction } from 'sigma/rendering';
import { Idea, Tag } from '../libs/model';
import AddIdeaButton from './AddIdeaButton';

const COLORS = {
	tag: '#698aab',
	idea: '#887f7a',
};

class MindMapController {
	graph: MultiDirectedGraph;
	private ideas: Map<number, Idea>;
	private tags: Map<number, Tag>;

	constructor() {
		this.graph = new MultiDirectedGraph();
		this.ideas = new Map();
		this.tags = new Map();
	}

	private addIdea(idea: Idea) {
		this.ideas.set(idea.id, idea);

		const tags = idea.tags.map(tag => `#${tag.name}`).join(' ');
		this.graph.addNode(idea.node, {
			label: `${idea.name}\n${tags}`,
			size: 50,
			color: COLORS.idea,
			x: Math.random() * 10,
			y: Math.random() * 10,
		});

		for (const tag of idea.tags) {
			this.addTag(tag);
			this.graph.addDirectedEdge(idea.node, tag.node);
		}
	}

	private addTag(tag: Tag) {
		this.tags.set(tag.id, tag);

		this.graph.addNode(tag.node, {
			label: `#${tag.name}`,
			size: 50,
			color: COLORS.tag,
			x: Math.random() * 10,
			y: Math.random() * 10,
		});
	}

	/** 指定されたタグとそのタグが付いたアイデアをマインドマップに追加する。 */
	addTagAndIdeas(tag: Tag, ideas: Idea[]) {
		if (!this.tags.has(tag.id)) {
			this.addTag(tag);
		}

		for (const idea of ideas) {
			if (!this.ideas.has(idea.id)) this.addIdea(idea);
			this.graph.addDirectedEdge(tag.node, idea.node);
		}
	}
}

function Force() {
	const { start, kill } = useWorkerLayoutForce({
		settings: {},
	});

	useEffect(() => {
		start();

		return () => {
			kill();
		};
	}, [start, kill]);

	return null;
}

function MindMap() {
	const controller = new MindMapController();

	controller.addTagAndIdeas(new Tag('ブルーアーカイブ', 1), [
		new Idea(
			'天使の輪っか 変える',
			1,
			[new Tag('天使', 2)],
			'天使の輪っかの説明',
		),
		new Idea('テスト2', 2, [], 'テスト2の説明'),
		new Idea('テスト3', 3, [], 'テスト3の説明'),
	]);

	return (
		<div>
			<SigmaContainer
				graph={controller.graph}
				style={{ width: '100%', height: '100vh' }}
				settings={{
					labelColor: { color: '#999999' },
				}}
			>
				<Force />
			</SigmaContainer>
			<AddIdeaButton /> {/* 右下のボタンを追加 */}
		</div>
	);
}

export default MindMap;
