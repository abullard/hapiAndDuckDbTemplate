import { getAllGames, postNewGame } from "../../services/games.service";
import { getAllGamesHandler, postNewGameHandler } from "../../handlers/games.handler";
import { mapToGame } from "../../mappers/games.mapper";
import { Game } from "../../types/interfaces";
import { chance } from "../setupChance";
import { Request, ResponseToolkit } from "@hapi/hapi";

jest.mock("../../services/games.service");
jest.mock("../../mappers/games.mapper");

const mockGetAllGames = jest.mocked(getAllGames);
const mockPostNewGame = jest.mocked(postNewGame);
const mockMapToGame = jest.mocked(mapToGame);

describe('games.handler', () => {
    describe('fn(getAllGames)', () => {
        it('should return all games from the database', async () => {
            const mappedGames: Game[] = chance.n(chance.game, 3);
            const duckDbValueGames = mappedGames.map(g => [g.gameId, g.gameName]);

            mockGetAllGames.mockResolvedValue(duckDbValueGames);
            mockMapToGame.mockReturnValue(mappedGames);

            const actual = await getAllGamesHandler();

            expect(actual).toEqual(mappedGames);
        });

        it('should throw an error when failing to exec DB query', () => {
            mockGetAllGames.mockRejectedValue(new Error("Records could not be read"));

            expect(getAllGamesHandler()).rejects.toThrow();
        });
    });

    describe('fn(postNewGameHandler)', () => {
        let request: Request;
        let h: ResponseToolkit;
        let gameId: string;
        
        beforeEach(() => {
            request = {
                payload: 'bogus'
            } as Request;
            h = {} as ResponseToolkit;
            gameId = chance.guid();
        });

        it('should post a new game to the database', async () => {
            mockPostNewGame.mockResolvedValue(gameId);

            const actual = await postNewGameHandler(request, h);

            expect(actual).toEqual(gameId);
        });

        it('should throw an error when failing to exec DB query', () => {
            mockPostNewGame.mockRejectedValue(new Error("Record not inserted"));

            expect(postNewGameHandler(request, h)).rejects.toThrow();
        });
    });
});