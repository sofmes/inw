import { SigmaContainer, useRegisterEvents } from '@react-sigma/core';
import { useWorkerLayoutForce } from '@react-sigma/layout-force';
import { MultiDirectedGraph } from 'graphology';
import { useEffect, useMemo } from 'react';
import { MindMapState, StyleStrategy } from '../libs/graph';
import { Idea, type Nodeable, type Tag, type User } from '../libs/model';
import { AddIdeaButton } from './AddIdeaButton';

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

type OnSelectFn = (obj: Nodeable | null) => void;
interface GraphEventsProps {
	state: MindMapState;
	onSelect: OnSelectFn;
}

function GraphEvents({ state, onSelect }: GraphEventsProps) {
	const registerEvents = useRegisterEvents();

	useEffect(() => {
		registerEvents({
			clickStage: _ => onSelect(null),
			clickNode: payload => {
				const tag = state.objs.getTag(payload.node);
				if (tag) {
					state.expandDeep(tag, [
						new Idea('派生アイデア', 10, [], ''),
						new Idea('派生アイデア2', 11, [], ''),
						new Idea('派生アイデア3', 12, [], ''),
					]);
					onSelect(tag);
				}

				const idea = state.objs.getIdea(payload.node);
				if (idea) {
					onSelect(idea);
				}
			},
		});
	}, [registerEvents]);

	return null;
}

export interface MindMapProps {
	root: Tag | User;
	onSelect: OnSelectFn;
	ideas: Idea[];
}

export function MindMap(props: MindMapProps) {
	const state = useMemo(() => {
		const state = new MindMapState(
			new MultiDirectedGraph(),
			new StyleStrategy(),
		);

		state.expandDeep(props.root, props.ideas);

		return state;
	}, [props.root]);

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
				<GraphEvents state={state} onSelect={props.onSelect} />
			</SigmaContainer>
			<AddIdeaButton /> {/* 右下のボタンを追加 */}
		</div>
	);
}
