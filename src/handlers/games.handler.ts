import { Request, ResponseToolkit } from "@hapi/hapi";
import { Game } from "../types/interfaces";
import { getAllGames, postNewGame } from "../services/games.service";
import { mapToGame } from "../mappers/games.mapper";

export const getAllGamesHandler = async (): Promise<Game[]> => {    
    const rows = await getAllGames();
    const resultSet = mapToGame(rows);

    return resultSet;
};

export const postNewGameHandler = async (request: Request, _: ResponseToolkit) => {
    return await postNewGame(request.payload);
};
