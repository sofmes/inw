import { useContext } from "react";
import { RootItemContext, useMindMap } from "~/components/Context";
import { makeClient } from "~/lib/client";
import { Notice, Tag } from "~/lib/model";
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

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	const url = new URL(request.url);
	const client = makeClient(url.origin);

	const response = await client.tag.index.$get({
		query: { page: url.searchParams.get("page") ?? "1" },
	});
	const tags = await response.json();

	return {
		root: new Notice("アイデアネットワーク"),
		tags: tags.map(tag => new Tag(tag.name, tag.id)),
	};
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const [_, setRootItem] = useContext(RootItemContext);
	const state = useMindMap();

	setRootItem(loaderData.root);
	state.expand(loaderData.root, loaderData.tags);

	return <></>;
}
