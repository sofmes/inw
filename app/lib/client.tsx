import { hc } from "hono/client";
import type { IdeaRoute } from "server/idea";
import type { TagRoute } from "server/tag";
import type { UserRoute } from "server/user";

let origin = "";
if (typeof location !== "undefined") {
	origin = location.origin;
}

const baseUrl = `${origin}/api`;
export const ideaClient = hc<IdeaRoute>(`${baseUrl}/idea`);
export const tagClient = hc<TagRoute>(`${baseUrl}/tag`);
export const userClient = hc<UserRoute>(`${baseUrl}/user`);
