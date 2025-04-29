# ADR - DuckDB, Hapi, & misc. justifications

### Context

We needed a way to record highscores that players achieve while playing games on the LT Arcade. Something simple to consume with a well documented interface.

### Decisions

- I chose Hapi for our server/routing needs. It's much easier to get started with than ExpressJS, and overall has a smaller footprint.
- I landed on using DuckDB because it's lightweight & easy to use. It's bundled with a NodeJS wrapper, making it VERY easy to incoporate with Hapi capabilities.
- I chose TypeScript because it provides type-safe entity -> model mapping. Since DuckDB is SQL, there are schemas to follow. 
- *There is a `migrations` folder, these migrations are not automated.
- There are two tables: `games` & `highscore`. All `highscore` entities have a Foreign Key called `gameId`, which is the Primary Key of the `games` table. You MUST link a `highscore` to a game in order to pull that game's highscores. See `src/types/interfaces.ts` to view the table's schemas.

### Consequences

- I don't think Hapi or Typescript will come with any drawbacks. 
- DuckDB isn't well charted territory, it's still pretty new. My hope is that this solution is robust enough, that we don't need to update major versions or rebuild any of it's workings.
- *Without automated migrations, you'll have to start the duckDb terminal session with `npm run start-db:session`, and run your SQL query in there.