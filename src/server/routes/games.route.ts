import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { getAllGamesHandler, postNewGameHandler } from "../handlers/games.handler";

export const route_getAllGames = (): ServerRoute<ReqRefDefaults> => {
    return {
        method: 'GET',
        path: '/games',
        handler: getAllGamesHandler,
    };
};

export const route_insertNewGame = (): ServerRoute<ReqRefDefaults> => {
    return {
        method: 'POST',
        path: '/games',
        handler: postNewGameHandler,
    };
};