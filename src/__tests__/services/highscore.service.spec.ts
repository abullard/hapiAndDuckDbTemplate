import { executeQuery } from '../../services/database';
import { getTopNByGame, postNewHighscore } from '../../services/highscore.service';
import { chance } from '../setupChance';
import { v4 as guid } from 'uuid';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock("../../services/database");
vi.mock('uuid', () => ({
    v4: vi.fn(),
}));

const mockExecuteQuery = vi.mocked(executeQuery);

describe('highscore.service', () => {
    describe('fn(getTopNByGame)', () => {
        it('should execute the query ', async () => {
            const gameId = chance.guid();
            const n = 5;
            mockExecuteQuery.mockResolvedValue([[]]);

            await getTopNByGame(gameId, n);

            expect(mockExecuteQuery).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM highscore'));
        });

        it('should throw an error when it fails to execute the query', () => {
            mockExecuteQuery.mockRejectedValue(new Error("Records could not be read"));

            expect(getTopNByGame(chance.guid(), 5)).rejects.toThrow();
        });
    });

    describe('fn(postNewHighscore)', () => {
        let payload: any;
        let gameId = chance.guid();

        beforeEach(() => {
            (guid as vi.Mock).mockImplementation(() => gameId);
            payload = chance.highscore();
            payload.scoreId = null;
        });

        it('should execute the query and return the new gameId', async () => {
            mockExecuteQuery.mockResolvedValue([[]]);

            const actual = await postNewHighscore(payload);

            const expectedQuery = 'INSERT INTO highscore (scoreId, date, initials, gameId, score)';
            expect(mockExecuteQuery).toHaveBeenLastCalledWith(expect.stringContaining(expectedQuery));
            expect(actual).toEqual(gameId);
        });

        it('should throw an error when it fails to execute the query', () => {
            mockExecuteQuery.mockRejectedValue(new Error("Records could not be read"));

            expect(postNewHighscore(payload)).rejects.toThrow();
        });
    });
});