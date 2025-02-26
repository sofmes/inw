import { SigmaContainer, useRegisterEvents } from '@react-sigma/core';
import { useWorkerLayoutForce } from '@react-sigma/layout-force';
import { MultiDirectedGraph } from 'graphology';
import { useEffect } from 'react';
import { MindMapGraph, StyleStrategy } from '../libs/graph';
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

function GraphEvents() {
	const registerEvents = useRegisterEvents();

	useEffect(() => {
		registerEvents({
			clickNode: payload => {
				payload.node;
			},
		});
	}, [registerEvents]);

	return null;
}

function MindMap() {
	const graph = new MultiDirectedGraph();
	const mindmap = new MindMapGraph(graph, new StyleStrategy());

	mindmap.addTagGroup(new Tag('ブルーアーカイブ', 1), [
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
				graph={graph}
				style={{ width: '100%', height: '100vh' }}
				settings={{
					labelColor: { color: '#999999' },
				}}
			>
				<Force />
				<GraphEvents />
			</SigmaContainer>
			<AddIdeaButton /> {/* 右下のボタンを追加 */}
		</div>
	);
}

export default MindMap;
