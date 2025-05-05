import { DuckDBValue } from "@duckdb/node-api";
import { Game } from "../types/interfaces";

export const mapToGame = (rows: DuckDBValue[][]): Game[] => {
    const resultSet: Game[] = [];

    for(let i in rows) {
        const columns = rows[i];

        resultSet.push({
            gameId: columns[0],
            gameName: columns[1]
        } as Game);
    }

    return resultSet;
}