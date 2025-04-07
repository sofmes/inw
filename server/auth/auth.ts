import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import type { Context } from "hono";

import * as schema from "../../database/schema";

export const auth = async (c: Context) => {
	const db = drizzle(c.env.DB, { schema, logger: true });

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "sqlite",
			schema,
		}),
		socialProviders: {
			google: {
				clientId: c.env.GOOGLE_CLIENT_ID,
				clientSecret: c.env.GOOGLE_CLIENT_SECRET,
				redirectUri: "http://localhost:5173/api/auth/callback/google",
			},
		},
	});
};
