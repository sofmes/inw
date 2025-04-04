import { createContext, useContext } from "react";
import type { MindMapState } from "~/lib/graph";
import { type Nodeable, Notice, type Root } from "../../app/lib/model";

export const SelectedItemContext = createContext<
	[Nodeable | null, (value: Nodeable | null) => void]
>([null, _ => {}]);

export const RootItemContext = createContext<[Root, (value: Root) => void]>([
	new Notice("まだここには何もありません。"),
	_ => {},
]);

export const StateContext = createContext<MindMapState | null>(null);

export function useMindMap(): MindMapState {
	const state = useContext(StateContext);
	return state!;
}
