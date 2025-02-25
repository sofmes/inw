import { SigmaContainer } from "@react-sigma/core";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { MultiDirectedGraph } from "graphology";
import { useEffect } from "react";
import AddIdeaButton from "./AddIdeaButton";

function FA2() {
	const { start, kill } = useWorkerLayoutForceAtlas2({
		settings: { slowDown: 10 },
	});

	useEffect(() => {
		// start FA2
		start();

		// Kill FA2 on unmount
		return () => {
			kill();
		};
	}, [start, kill]);

	return null;
}

function MindMap() {
	const graph = new MultiDirectedGraph();

	graph.addNode("a1", { label: "Node 1", size: 30, x: 1, y: 0 });
	graph.addNode("a2", { label: "Node 2", size: 30, x: 0, y: 0 });
	graph.addNode("a3", { label: "Node 3", size: 30, x: 2, y: 3 });

	return (
		<div>
			<SigmaContainer graph={graph} style={{ width: "100%", height: "100vh" }}>
				<FA2 />
			</SigmaContainer>
			<AddIdeaButton /> {/* 右下のボタンを追加 */}
		</div>
	);
}

export default MindMap;
