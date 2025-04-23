import { getToken } from "@auth/core/jwt";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { Env } from "../index";

export interface Session {
	id: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
	description?: string;
}

export async function getSession(c: Context<Env>): Promise<Session | null> {
	const cookie = c.req.raw.headers.get("cookie");
	if (!cookie) return null;

	try {
		const token = await getToken({
			req: c.req.raw,
			secret: c.env.AUTH_SECRET,
		});
		if (!token?.sub) return null;

		const user = await c.var.data.user.getUserById(token.sub);
		if (!user) return null;

		return {
			id: token.sub,
			name: token.name as string | null,
			email: token.email as string | null,
			image: token.picture as string | null,
			description: user.description || undefined,
		};
	} catch (error) {
		console.error("Error parsing session:", error);
		return null;
	}
}

export async function assertSession(c: Context<Env>): Promise<Session> {
	const session = await getSession(c);
	if (!session) throw new HTTPException(401);

	return session;
}
