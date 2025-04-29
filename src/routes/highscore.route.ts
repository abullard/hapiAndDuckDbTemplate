import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { getTopNByGameHandler, postNewHighscoreHandler } from "../handlers/highscore.handler";

export const route_getTopNByGame = (): ServerRoute<ReqRefDefaults> => {
    return {
        method: 'GET',
        path: '/highscore/{gameId}/top/{n}',
        handler: getTopNByGameHandler,
    };
};

export const route_insertNewHighscore = (): ServerRoute<ReqRefDefaults> => {
    return {
        method: 'POST',
        path: '/highscore',
        handler: postNewHighscoreHandler,
    };
};