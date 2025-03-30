import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	route("/", "routes/mind-map.tsx", [index("routes/home.tsx")]),
] satisfies RouteConfig;
