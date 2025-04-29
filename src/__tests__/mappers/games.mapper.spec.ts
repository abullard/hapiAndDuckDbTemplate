import { Game } from "../../types/interfaces";
import { mapToGame } from "../../mappers/games.mapper";
import { chance } from "../setupChance";

describe('games.mapper', () => {
    describe('fn(mapToGame)', () => {
        it('should return an array of Game objects', () => {
            const mappedGames: Game[] = chance.n(chance.game, 3);
            const duckDbValueGames = mappedGames.map(g => [g.gameId, g.gameName]);

            const actual = mapToGame(duckDbValueGames);

            expect(actual).toEqual(mappedGames);
        });
    });
});