import * as schema from "~/database/schema";

import { useContext } from "react";
import { RootItemContext } from "~/components/Context";
import { Tag } from "~/lib/model";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "アイデアネットワーク" },
		{
			name: "description",
			content: "みんなでちょっとしたアイデアを共有しよう！",
		},
	];
}

export function clientLoader() {
	return new Tag("ブルーアーカイブ", 1);
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const [_, setRootItem] = useContext(RootItemContext);
	setRootItem(loaderData);

	return <></>;
}
