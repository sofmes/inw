import { SigmaContainer, useRegisterEvents } from '@react-sigma/core';
import { useWorkerLayoutForce } from '@react-sigma/layout-force';
import { MultiDirectedGraph } from 'graphology';
import { useEffect } from 'react';
import { MindMapState, StyleStrategy } from '../libs/graph';
import { Idea, Tag } from '../libs/model';
import AddIdeaButton from './AddIdeaButton';

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

function GraphEvents({ state }: { state: MindMapState }) {
	const registerEvents = useRegisterEvents();

	useEffect(() => {
		registerEvents({
			clickNode: payload => {
				const tag = state.objs.getTag(payload.node);
				if (tag) {
					state.addTagGroup(tag, [
						new Idea('派生アイデア', 10, [], ''),
						new Idea('派生アイデア2', 11, [], ''),
						new Idea('派生アイデア3', 12, [], ''),
					]);
				}

				const idea = state.objs.getIdea(payload.node);
				if (!idea) return;

				// アイデア選択
				console.log(idea);
			},
		});
	}, [registerEvents]);

	return null;
}

export function MindMap(props: { tag: Tag; ideas: Idea[] }) {
	const state = new MindMapState(
		new MultiDirectedGraph(),
		new StyleStrategy(),
	);

	state.addTagGroup(props.tag, props.ideas);

	return (
		<div>
			<SigmaContainer
				graph={state.graph}
				style={{ width: '100%', height: '100vh' }}
				settings={{
					labelColor: { color: '#999999' },
				}}
			>
				<Force />
				<GraphEvents state={state} />
			</SigmaContainer>
			<AddIdeaButton /> {/* 右下のボタンを追加 */}
		</div>
	);
}
