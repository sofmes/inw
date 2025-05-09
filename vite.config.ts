import adapter from "@hono/vite-dev-server/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import serverAdapter from "hono-react-router-adapter/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";

export default defineConfig(({ isSsrBuild }) => ({
	ssr: {
		target: "webworker",
		noExternal: true,
		resolve: {
			conditions: ["workerd", "browser"],
		},
		optimizeDeps: {
			include: [
				"react",
				"react/jsx-runtime",
				"react/jsx-dev-runtime",
				"react-dom",
				"react-dom/server",
				"react-router",
			],
		},
	},
	plugins: [
		cloudflareDevProxy({
			getLoadContext,
		}),
		tailwindcss(),
		reactRouter(),
		serverAdapter({
			adapter,
			getLoadContext,
			entry: "server/index.ts",
		}),
		tsconfigPaths(),
	],
}));
