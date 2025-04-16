import { useContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { RootItemContext, useMindMap } from "~/components/Context";
import { makeClient } from "~/lib/client";
import { Tag, Trigger } from "~/lib/model";
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

async function getData(url: URL, page: string) {
	const client = makeClient(url.origin);

	const response = await client.tag.index.$get({
		query: { page },
	});
	const tags = await response.json();

	return {
		root: null,
		tags: tags.map(tag => new Tag(tag.name, tag.id)),
	};
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	const url = new URL(request.url);

	return await getData(url, url.searchParams.get("page") ?? "1");
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const [_, setRootItem] = useContext(RootItemContext);
	const state = useMindMap();

	// 最初のタグを追加する。
	const addTags = (tags: Tag[]) => {
		for (const tag of tags) {
			state.addNode(tag);
		}
	};
	addTags(loaderData.tags);

	// タグをもっと読み込むためのボタン
	const [searchParams, setSearchParams] = useSearchParams();
	const loadTagsTrigger = useMemo(() => {
		const trigger = new Trigger("タグをもっと読み込む");
		state.addNode(trigger);
		return trigger;
	}, []);

	useEffect(() => {
		const page = Number.parseInt(searchParams.get("page") ?? "1");

		const triggerHandler = async () => {
			setSearchParams(
				new URLSearchParams({ page: (page + 1).toString() }),
			);
		};

		loadTagsTrigger.onClick = triggerHandler;
	}, [searchParams, setSearchParams]);

	return <></>;
}
