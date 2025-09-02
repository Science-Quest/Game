import { route } from "@react-router/dev/routes";

export default [
    route( 'games', 'games/root.jsx', [
            route('box-recall/:level', "games/box-recall/App.jsx"),
            route('penguin-dash/:level', "games/penguin-dash/App.jsx"),
            route('bomb-road/:level', "games/bomb-road/App.jsx"),
            route('connect-things', "games/connect-things/App.jsx"),
        ]
    )
];
