import { SigmaContainer, useRegisterEvents } from "@react-sigma/core";
import { useWorkerLayoutForce } from "@react-sigma/layout-force";
import { useEffect } from "react";
import type { MindMapState } from "../../app/lib/graph";
import type { Nodeable } from "../../app/lib/model";
import { AddIdeaButton } from "./AddIdeaButton";
import "./mindmap.css";

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

export type OnSelectFn = (obj: Nodeable | null) => void;
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
					onSelect(tag);
					return;
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
	state: MindMapState;
	onSelect: OnSelectFn;
}

export function MindMap(props: MindMapProps) {
	return (
		<div>
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
			<AddIdeaButton /> {/* 右下のボタンを追加 */}
		</div>
	);
}
