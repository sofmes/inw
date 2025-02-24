import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { MultiDirectedGraph } from "graphology";
import { useEffect } from "react";
import AddIdeaButton from "./AddIdeaButton";

function LoadGraph() {
	const loadGraph = useLoadGraph();

	useEffect(() => {
		const graph = new MultiDirectedGraph();

		graph.addNode("a1", { label: "Node 1", size: 30, x: 0, y: 0 });
		graph.addNode("a2", { label: "Node 2", size: 30, x: 10, y: 10 });

		loadGraph(graph);
	}, [loadGraph]);

	return null;
}

function MindMap() {
	return (
		<div>
			<SigmaContainer style={{ width: "100%", height: "100vh" }}>
				<LoadGraph />
			</SigmaContainer>
			<AddIdeaButton /> {/* 右下のボタンを追加 */}
		</div>
	);
}

export default MindMap;
