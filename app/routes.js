import { prefix, route } from "@react-router/dev/routes";

export default [
    ...prefix(
        'games',
        [
            route('box-recall', "games/box-recall/src/App.jsx"),
            route('penguin-dash', "games/penguin-dash/App.jsx"),
            route('connect-things', "games/connect-things/App.jsx"),
            route('bomb-road', "games/bomb-road/App.jsx"),
            route('simbiosis', "games/simbiosis/App.jsx"),
        ]
    )
];
