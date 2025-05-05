import { executeQuery } from '../../services/database';
import { getAllGames, postNewGame } from '../../services/games.service';
import { chance } from '../setupChance';
import { v4 as guid } from 'uuid';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock("../../services/database");
vi.mock('uuid', () => ({
    v4: vi.fn(),
}));

const mockExecuteQuery = vi.mocked(executeQuery);

describe('games.service', () => {
    describe('fn(getAllGames)', () => {
        it('should execute the query ', async () => {
            mockExecuteQuery.mockResolvedValue([[]]);

            await getAllGames();

            expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM games;');
        });

        it('should throw an error when it fails to execute the query', async () => {
            mockExecuteQuery.mockRejectedValue(new Error("Records could not be read"));

            await expect(getAllGames()).rejects.toThrow();
        });
    });

    describe('fn(postNewGame)', () => {
        let gameId = chance.guid();

        beforeEach(() => {
            (guid as vi.Mock).mockImplementation(() => gameId);
        });

        it('should execute the query and return the new gameId', async () => {
            mockExecuteQuery.mockResolvedValue([[]]);

            const actual = await postNewGame({ gameName: 'ファイナルファンタジー' });

            const expectedQuery = 'INSERT INTO games (gameId, gameName)';
            expect(mockExecuteQuery).toHaveBeenLastCalledWith(expect.stringContaining(expectedQuery));
            expect(actual).toEqual(gameId);
        });

        it('should throw an error when it fails to execute the query', async () => {
            mockExecuteQuery.mockRejectedValue(new Error("Records could not be read"));

            await expect(getAllGames()).rejects.toThrow();
        });
    });
});