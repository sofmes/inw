import { hc } from "hono/client";
import type { IdeaRoute } from "server/idea";
import type { TagRoute } from "server/tag";

const ideaTemp = hc<IdeaRoute>("");
const tagTemp = hc<TagRoute>("");
const clientTemp = { idea: ideaTemp, tag: tagTemp };

let client: typeof clientTemp | undefined = undefined;

export function makeClient(origin: string) {
	const baseUrl = `${origin}/api`;
	const ideaClient = hc<IdeaRoute>(`${baseUrl}/idea`);
	const tagClient = hc<TagRoute>(`${baseUrl}/tag`);

	client = {
		idea: ideaClient,
		tag: tagClient,
	};

	return client;
}
