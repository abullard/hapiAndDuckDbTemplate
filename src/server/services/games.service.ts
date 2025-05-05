import { DuckDBValue } from '@duckdb/node-api';
import { executeQuery } from './database';
import { v4 as guid } from 'uuid';

export const getAllGames = async (): Promise<DuckDBValue[][]> => {
    const selectAllGamesQuery = 'SELECT * FROM games;';

    try {
        return await executeQuery(selectAllGamesQuery);
    } catch (error) {
        throw new Error("Records could not be read");
    }
};

export const postNewGame = async (payload: any): Promise<string> => {
    const gameId = guid();
    const sanitizedGameName = payload.gameName.replace(/\'/g, '\'\'');

    const insertRecordQuery = `
        INSERT INTO games (gameId, gameName)
        VALUES (
            '${gameId}',
            '${sanitizedGameName}',
        )
    `;

    try {
        await executeQuery(insertRecordQuery);
        return gameId;
    } catch (error) {
        throw new Error("Record not inserted");
    }
};