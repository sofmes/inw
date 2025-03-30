import { createContext } from "react";
import type { Nodeable, Root } from "../../app/lib/model";

export const SelectedItemContext = createContext<
	[Nodeable | null, (value: Nodeable | null) => void]
>([null, _ => {}]);

export const RootItemContext = createContext<
	[Root | null, (value: Root | null) => void]
>([null, _ => {}]);
