import { Request, ResponseToolkit } from "@hapi/hapi";
import { getTopNByGame, postNewHighscore } from "../services/highscore.service";
import { mapToHighscore } from "../mappers/highscore.mapper";
import { Highscore } from "../types/interfaces";

export const getTopNByGameHandler = async (request: Request, _: ResponseToolkit): Promise<Highscore[]> => {
    const gameId = request.params.gameId;
    const n = Number(request.params.n);

    const rows = await getTopNByGame(gameId, n);
    const resultSet = mapToHighscore(rows);

    return resultSet;
};

export const postNewHighscoreHandler = async (request: Request, _: ResponseToolkit) => {
    return await postNewHighscore(request.payload);
};

