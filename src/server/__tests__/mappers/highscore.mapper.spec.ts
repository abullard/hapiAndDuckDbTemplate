import { Highscore } from "../../types/interfaces";
import { mapToHighscore } from "../../mappers/highscore.mapper";
import { chance } from "../setupChance";
import { DuckDBValue } from "@duckdb/node-api";

describe('games.mapper', () => {
    describe('fn(mapToGame)', () => {
        it('should return an array of Game objects', () => {
            const mappedHighscores: Highscore[] = chance.n(chance.highscore, 3);
            const duckDbValueHighscores = mappedHighscores.map(h => {
                // need to clear milliseconds to match PROD code's date generation
                h.date.setMilliseconds(0);
                return [
                    h.scoreId as DuckDBValue,
                    h.date as unknown as DuckDBValue,
                    h.initials as DuckDBValue,
                    h.gameId as DuckDBValue,
                    h.score as DuckDBValue,
                ]});

            const actual = mapToHighscore(duckDbValueHighscores);

            expect(actual).toEqual(mappedHighscores);
        });
    });
});