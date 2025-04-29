import { Server } from "@hapi/hapi";
import { route_getAllGames, route_insertNewGame } from "./routes/games.route";
import { route_getTopNByGame, route_insertNewHighscore } from "./routes/highscore.route";

const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });

    // GET
    server.route(route_getTopNByGame());
    server.route(route_getAllGames());

    // POST
    server.route(route_insertNewHighscore());
    server.route(route_insertNewGame());

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
