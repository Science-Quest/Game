import { useParams } from "react-router";
import { lazy, Suspense } from "react";

// Grab all App.jsx files under games/*
const modules = import.meta.glob("./*/App.jsx");

console.log(modules)
// Map: { "connect-things": LazyComponent, "bomb-road": LazyComponent, ... }
const lazyComponents = Object.fromEntries(
    Object.entries(modules).map(([path, loader]) => {
        const gameName = path.match(/\.\/([^/]+)\/App\.jsx$/)[1];
        return [gameName, lazy(loader)];
    })
);

export default function GameRoute() {
    const { game, level } = useParams();
    const Component = lazyComponents[game];

    if (!Component) {
        return <p>Game not found: {game}</p>;
    }

    // 👇 `key={level}` ensures React remounts everything when the level changes
    return (
        <div key={level}>
            <Suspense fallback={<p>Loading game...</p>}>
                <Component level={level} />
            </Suspense>
        </div>
    );
}
