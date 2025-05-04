import { useContext, useEffect, useMemo, useState } from "react";
import { RootItemContext, useMindMap } from "~/components/Context";
import { tagClient } from "~/lib/client";
import { Tag, Trigger } from "~/lib/model";

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
	const response = await tagClient.index.$get({
		query: { page },
	});
	const tags = await response.json();

	return {
		root: null,
		tags: tags.map(tag => new Tag(tag.name, tag.id)),
	};
}

export default function Home() {
	const [_, setRootItem] = useContext(RootItemContext);
	const [page, setPage] = useState(1);
	const state = useMindMap();

	// 最初のタグを追加する。
	const addTags = (tags: Tag[]) => {
		if (tags.length === 0) return;

		for (const tag of tags) {
			state.addNode(tag);
		}
	};

	useEffect(() => {
		(async () => {
		})();
	}, [page]);

	// タグをもっと読み込むためのボタン
	const loadTagsTrigger = useMemo(() => {
		const trigger = new Trigger("タグをもっと読み込む");
		state.addNode(trigger);
		return trigger;
	}, []);

	useEffect(() => {
		const triggerHandler = async () => {
			const data = await getData(new URL(location.href), page.toString());

			if (data.tags.length) {
				addTags(data.tags);
				setPage(page + 1);
			} else {
				alert("これ以上タグは存在しません。")
			}
		};

		loadTagsTrigger.onClick = triggerHandler;
	
		if (page === 1) triggerHandler();
	}, [page]);

	return <></>;
}
