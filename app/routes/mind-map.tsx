import { MultiDirectedGraph } from "graphology";
import { useEffect, useMemo, useState } from "react";
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
import { useUser } from "~/hooks/useUser";
import { makeClient } from "~/lib/client";
import { MindMapState, StyleStrategy } from "~/lib/graph";
import { Idea, type Nodeable, Notice, type Root } from "~/lib/model";
import type { Route } from "./+types/mind-map";

export async function clientAction({ request }: Route.ClientActionArgs) {
	const data = await request.formData();
	const client = makeClient(new URL(request.url).origin);

	const json = {
		name: data.get("name")!.toString(),
		authorId: data.get("userId")!.toString(),
		description: data.get("description")!.toString(),
		tags: data
			.get("tags")!
			.toString()
			.split(/\s+/)
			.map(tag => (tag.startsWith("#") ? tag.slice(1) : tag)),
	};

	const response = await client.idea.index.$post({ json });
	return [await response.json(), json] as const;
}

export default function MindMapPage({ actionData }: Route.ComponentProps) {
	const [selectedItem, setSelectedItem] = useState<Nodeable | null>(null);
	const [rootItem, setRootItem] = useState<Root>(new Notice("読み込み中..."));
	const user = useUser();
	console.log(user);

	const state = useMemo(() => {
		const state = new MindMapState(
			new MultiDirectedGraph(),
			new StyleStrategy(),
		);

		return state;
	}, []);

	// 投稿したアイデアをマインドマップに反映する。
	useEffect(() => {
		if (!actionData || !user.data) return;
		const [{ id, tags }, { name, description }] = actionData;

		const idea = Idea.fromData({
			name,
			id,
			description,
			author: user.data,
			tags,
		});
		state.expand(idea, idea.tags);
	}, [state, actionData]);

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

				{user.data ? <AddIdeaButton /> : null}
			</div>
		</div>
	);
}
