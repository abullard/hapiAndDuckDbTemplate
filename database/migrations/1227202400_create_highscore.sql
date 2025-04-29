CREATE TABLE IF NOT EXISTS highscore (
    scoreId varchar NOT NULL,
    date Date NOT NULL,
    initials varchar NOT NULL,
    gameId varchar NOT NULL,
    score int,
    PRIMARY KEY (scoreId),
    FOREIGN KEY (gameId) REFERENCES games(gameId)
);
