import { DuckDBValue } from "@duckdb/node-api";
import { Highscore } from "../types/interfaces";

export const mapToHighscore = (rows: DuckDBValue[][]): Highscore[] => {
    const resultSet: Highscore[] = [];

    for(let i in rows) {
        const columns = rows[i];

        const dbDateStr = columns[1]?.toString();
        const today = new Date().toString();
        
        const date: Date = new Date(dbDateStr ?? today);

        resultSet.push({
            scoreId: columns[0],
            date,
            initials: columns[2],
            gameId: columns[3],
            score: columns[4],
        } as Highscore);
    }

    return resultSet;
}