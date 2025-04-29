import Chance from 'chance';
import { Game, Highscore } from '../types/interfaces';

export const chance = new Chance() as Chance.Chance & CustomChance;

export interface CustomChance {
    game(options?: any): Game;
    highscore(): Highscore;
}

chance.mixin({
    game: (options?: Partial<Game>) => ({
        gameName: chance.word(),
        gameId: chance.guid(),
        ...options,
    }),

    highscore: (options?: Partial<Highscore>) => ({
        scoreId: chance.guid(),
        date: chance.date(),
        initials: chance.word({ length: 3 }),
        gameId: chance.guid(),
        score: chance.natural({ min: 1000, max: 1000000 }),
        ...options,
    }),
});