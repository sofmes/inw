import { MultiDirectedGraph } from "graphology";
import { useMemo, useState } from "react";
import { Outlet } from "react-router";
import {
	RootItemContext,
	SelectedItemContext,
	StateContext,
} from "~/components/Context";
import { Drawer } from "~/components/Drawer";
import { Header } from "~/components/Header";
import { MindMap } from "~/components/mindmap";
import { MindMapState, StyleStrategy } from "~/lib/graph";
import { type Nodeable, Notice, type Root } from "~/lib/model";
import type { Route } from "./+types/mind-map";

export async function clientAction({ request }: Route.ClientActionArgs) {}

export default function MindMapPage({ loaderData }: Route.ComponentProps) {
	const [selectedItem, setSelectedItem] = useState<Nodeable | null>(null);
	const [rootItem, setRootItem] = useState<Root>(new Notice("読み込み中..."));

	const state = useMemo(() => {
		const state = new MindMapState(
			new MultiDirectedGraph(),
			new StyleStrategy(),
		);

		return state;
	}, [rootItem, loaderData]);

	return (
		<div className="App">
			<Header />
			<RootItemContext.Provider value={[rootItem, setRootItem]}>
				<StateContext.Provider value={state}>
					<SelectedItemContext.Provider
						value={[selectedItem, setSelectedItem]}
					>
						<Drawer />
						<Outlet />
					</SelectedItemContext.Provider>
				</StateContext.Provider>

				{rootItem ? (
					<MindMap state={state} onSelect={setSelectedItem} />
				) : null}
			</RootItemContext.Provider>
		</div>
	);
}
