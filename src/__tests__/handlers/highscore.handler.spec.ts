import { getTopNByGame, postNewHighscore } from "../../services/highscore.service";
import { mapToHighscore } from "../../mappers/highscore.mapper";
import { getTopNByGameHandler, postNewHighscoreHandler } from "../../handlers/highscore.handler";
import { Highscore } from "../../types/interfaces";
import { chance } from "../setupChance";
import { DuckDBValue } from "@duckdb/node-api";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { vi, describe, beforeEach, it, expect } from 'vitest';

vi.mock("../../services/highscore.service");
vi.mock("../../mappers/highscore.mapper");

const mockGetTopNByGame = vi.mocked(getTopNByGame);
const mockMapToHighscore = vi.mocked(mapToHighscore);
const mockPostNewHighscore = vi.mocked(postNewHighscore);

describe('highscore.handler', () => {
    let request: Request;
    let h: ResponseToolkit;

    beforeEach(() => {
        request = {
            params: {
                gameId: chance.guid(),
                n: 3
            }
        } as unknown as Request;
        h = {} as ResponseToolkit;
    });

    describe('fn(getTopNByGamerHandler)', () => {
        it('should get the top 3 highscores from the database', async () => {
            const mappedHighscores: Highscore[] = chance.n(chance.highscore, 3);
            const duckDbValueHighscores = mappedHighscores.map(h =>
                [
                    h.scoreId as DuckDBValue,
                    h.date as unknown as DuckDBValue,
                    h.initials as DuckDBValue,
                    h.gameId as DuckDBValue,
                    h.score as DuckDBValue,
                ]);

            mockGetTopNByGame.mockResolvedValue(duckDbValueHighscores);
            mockMapToHighscore.mockReturnValue(mappedHighscores);

            const actual = await getTopNByGameHandler(request, h);

            expect(actual).toEqual(mappedHighscores);
        });

        it('should throw an error when failing to exec DB query', () => {
            mockGetTopNByGame.mockRejectedValue(new Error('Records could not be read'));

            expect(getTopNByGameHandler(request, h)).rejects.toThrow();
        });
    });

    describe('fn(postNewHighscoreHandler)', () => {
        it('should add a new highscore to the database', async () => {
            const scoreId = chance.guid();
            mockPostNewHighscore.mockResolvedValue(scoreId);

            const actual = await postNewHighscoreHandler(request, h);

            expect(actual).toEqual(scoreId);
        });

        it('should throw an error when failing to exec DB query', () => {
            mockPostNewHighscore.mockRejectedValue(new Error("Record not inserted"));

            expect(postNewHighscoreHandler(request, h)).rejects.toThrow();
        });
    });
});