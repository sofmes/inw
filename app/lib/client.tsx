import { hc } from "hono/client";
import type { IdeaRoute } from "server/idea";
import type { TagRoute } from "server/tag";
import { BASE_URL } from "./env";

export const idea = hc<IdeaRoute>(BASE_URL);
export const tag = hc<TagRoute>(BASE_URL);
