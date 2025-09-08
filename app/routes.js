import { route } from "@react-router/dev/routes";

export default [
    route("games", "games/root.jsx", [
        route(":game/:level", "games/GameRoute.jsx")
    ]),
];
