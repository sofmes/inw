import { MultiDirectedGraph } from "graphology";
import { useMemo, useState } from "react";
import { Outlet } from "react-router";
import { AddIdeaButton } from "~/components/AddIdeaButton";
import {
	RootItemContext,
	SelectedItemContext,
	StateContext,
} from "~/components/Context";
import { Drawer } from "~/components/Drawer";
import { Header } from "~/components/Header";
import { MindMap } from "~/components/mindmap";
import { makeClient } from "~/lib/client";
import { MindMapState, StyleStrategy } from "~/lib/graph";
import { type Nodeable, Notice, type Root } from "~/lib/model";
import type { Route } from "./+types/mind-map";

export async function clientAction({ request }: Route.ClientActionArgs) {
	const data = await request.formData();
	const client = makeClient(new URL(request.url).origin);

	const json = {
		name: data.get("name")!.toString(),
		authorId: 1, // TODO: ログイン機能を実装したら、これを設定する。
		description: data.get("description")!.toString(),
		tags: data
			.get("tags")!
			.toString()
			.split(/\s+/)
			.map(tag => (tag.startsWith("#") ? tag.slice(1) : tag)),
	};

	client.idea.index.$post({ json });
}

export default function MindMapPage({ loaderData }: Route.ComponentProps) {
	const [selectedItem, setSelectedItem] = useState<Nodeable | null>(null);
	const [rootItem, setRootItem] = useState<Root>(new Notice("読み込み中..."));

	const state = useMemo(() => {
		const state = new MindMapState(
			new MultiDirectedGraph(),
			new StyleStrategy(),
		);

		return state;
	}, []);

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
			</RootItemContext.Provider>

			<div>
				{rootItem ? (
					<MindMap state={state} onSelect={setSelectedItem} />
				) : null}

				<AddIdeaButton />
			</div>
		</div>
	);
}
