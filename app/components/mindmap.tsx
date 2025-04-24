import { SigmaContainer, useRegisterEvents } from "@react-sigma/core";
import { useWorkerLayoutForce } from "@react-sigma/layout-force";
import { useEffect } from "react";
import { ideaClient } from "~/lib/client";
import type { MindMapState } from "../../app/lib/graph";
import { Idea, type Nodeable, type Tag } from "../../app/lib/model";
import "./mindmap.css";

function Force() {
	const { start, kill } = useWorkerLayoutForce({
		settings: { attraction: 0.00001, repulsion: 0.3 },
	});

	useEffect(() => {
		start();

		return () => {
			kill();
		};
	}, [start, kill]);

	return null;
}

export type OnSelectFn = (obj: Nodeable | null) => void;
interface GraphEventsProps {
	state: MindMapState;
	onSelect: OnSelectFn;
}

async function expandTag(state: MindMapState, tag: Tag) {
	const response = await ideaClient.index.$get({
		query: { tagId: tag.id.toString(), page: (++tag.page).toString() },
	});
	const data = await response.json();

	state.expandWithIdeas(
		tag,
		data.map(raw => Idea.fromData(raw)),
	);
}

function GraphEvents({ state, onSelect }: GraphEventsProps) {
	const registerEvents = useRegisterEvents();

	useEffect(() => {
		registerEvents({
			clickStage: _ => onSelect(null),
			doubleClickNode: payload => {},
			clickNode: payload => {
				const tag = state.objs.getTag(payload.node);
				if (tag) {
					expandTag(state, tag);
					return;
				}

				const idea = state.objs.getIdea(payload.node);
				if (idea) {
					onSelect(idea);
				}

				const trigger = state.objs.getTrigger(payload.node);
				if (trigger && trigger.onClick !== undefined) {
					trigger.onClick();
				}
			},
		});
	}, [registerEvents]);

	return null;
}

export interface MindMapProps {
	state: MindMapState;
	onSelect: OnSelectFn;
}

export function MindMap(props: MindMapProps) {
	return (
		<SigmaContainer
			graph={props.state.graph}
			style={{ width: "100%", height: "100vh" }}
			settings={{
				labelColor: { color: "#999999" },
				allowInvalidContainer: true,
			}}
		>
			<Force />
			<GraphEvents state={props.state} onSelect={props.onSelect} />
		</SigmaContainer>
	);
}
