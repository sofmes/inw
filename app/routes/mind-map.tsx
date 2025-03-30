import { useState } from "react";
import { Outlet } from "react-router";
import { RootItemContext, SelectedItemContext } from "~/components/Context";
import { Drawer } from "~/components/Drawer";
import { Header } from "~/components/Header";
import { MindMap } from "~/components/mindmap";
import { type Nodeable, type Root, Tag } from "~/lib/model";
import { initial } from "~/lib/sample-data";
import type { Route } from "./+types/mind-map";

export function clientLoader() {
	return initial;
}

export default function MindMapPage({ loaderData }: Route.ComponentProps) {
	const [selectedItem, setSelectedItem] = useState<Nodeable | null>(null);
	const [rootItem, setRootItem] = useState<Root | null>(null);

	return (
		<div className="App">
			<Header />
			<RootItemContext.Provider value={[rootItem, setRootItem]}>
				<SelectedItemContext.Provider
					value={[selectedItem, setSelectedItem]}
				>
					<Drawer />
					<Outlet />
				</SelectedItemContext.Provider>

				{rootItem ? (
					<MindMap
						root={rootItem}
						onSelect={setSelectedItem}
						ideas={loaderData}
					/>
				) : null}
			</RootItemContext.Provider>
		</div>
	);
}
