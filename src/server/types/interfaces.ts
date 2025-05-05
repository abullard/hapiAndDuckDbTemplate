export interface Highscore {
    scoreId: string;
    date: Date;
    initials: string;
    gameId: string;
    score: number;
}

export interface Game {
    gameId: string;
    gameName: string;
}