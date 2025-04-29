import { formatDuckDbDate } from '../utils/date';
import { executeQuery } from './database';
import { v4 as guid } from 'uuid';

export const getTopNByGame = async (gameId: string, n: number) => {
    const selectNRecordsQuery = `
        SELECT * FROM highscore
        WHERE gameId = '${gameId}'
        ORDER BY score DESC
        LIMIT ${n};
    `;

    try {
        return await executeQuery(selectNRecordsQuery);
    } catch (error) {
        throw new Error("Records could not be read");
    }
};

export const postNewHighscore = async (payload: any) => {
    const scoreId = guid();

    const insertRecordQuery = `
        INSERT INTO highscore (scoreId, date, initials, gameId, score)
        VALUES (
            '${scoreId}',
            '${formatDuckDbDate(new Date(payload.date))}',
            '${payload.initials}',
            '${payload.gameId}',
             ${payload.score}
        )
    `;

    try {
        await executeQuery(insertRecordQuery);
        return scoreId;
    } catch (error) {
        throw new Error("Record not inserted");
    }
};
