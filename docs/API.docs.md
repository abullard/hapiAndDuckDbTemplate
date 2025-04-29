# Highscore Database Web Server API Docs

*Note: There is an importable Postman collection located at `./docs/postman/collection_highscore_db.json` for testing*

### Table of Contents
- [GET /highscore/{gameId}/top/{n}](#get-top-N-scores-by-gameId)
- [POST /highscore](#add-a-new-highscore)
- [GET /games](#get-all-games)
- [POST /games](#add-a-new-game)

### Base URL
The base URL for the API is: `http://localhost:3000`

# Endpoints

### Get top *n* scores by gameId

**Endpoint**: `/highscore/{gameId}/top/{n}`

**Method**: GET

**Description**: GET the top N scores by your game's ID. To add a new game and received your game ID, please see [POST /games](#Post-new-game).

**Request Parameters**:
- `gameId`: The GUID matching your game's ID.
- `n`: The number of highscores you want to retrieve. e.g. 3, 5, 10, 20, ...

#### Request Example:
```
curl -X GET http://localhost:3000/highscore/84b1de79-7456-4a57-9a37-d78be11df934/top/3
```

#### Example Success Response (HTTP 200): 
```
[
  {
    "scoreId": "52767b3f-1395-4ccf-b622-d4669c840eed",
    "date": "2025-02-16T00:00:00.000Z",
    "initials": "DNF",
    "gameId": "84b1de79-7456-4a57-9a37-d78be11df934",
    "score": 1000020
  },
  {
    "scoreId": "e6172f7a-957f-44c1-b068-efa6359a736d",
    "date": "2025-02-16T00:00:00.000Z",
    "initials": "DNF",
    "gameId": "84b1de79-7456-4a57-9a37-d78be11df934",
    "score": 1000010
  },
  {
    "scoreId": "040b6315-a17a-4ec2-838b-cad5014a1bbc",
    "date": "2025-02-16T00:00:00.000Z",
    "initials": "DNF",
    "gameId": "84b1de79-7456-4a57-9a37-d78be11df934",
    "score": 1000001
  }
]
```

---

### Add a new highscore

**Endpoint**: `/highscore`

**Method**: POST

**Description**: Post a new highscore for a game. The gameId to tie the score to should be apart of your request body.

**Request Parameters**:
- `date`: The date the score was achieved
- `initials`: The player's initials
- `gameId`: The GUID matching your game's ID.
- `score`: The score the player achieved

#### Request Example:

```
curl -X POST http://localhost:3000/highscore \
     -H "Content-Type: application/json" \
     -d '{"gameId": "84b1de79-7456-4a57-9a37-d78be11df934", "score": "1999996", "date": "03-21-2001", "initials": "DNR"}'
```

#### Success Response is just a 200

---

### Get all games

**Endpoint**: `/games`

**Method**: GET

**Description**: GET all the games in the database.

#### Request Example:
```
curl -X GET http://localhost:3000/games
```

#### Example Success Response (HTTP 200): 
```
[
  {
    "gameId": "84b1de79-7456-4a57-9a37-d78be11df934",
    "gameName": "Shrek 2: The Never-ending Superslam"
  },
  {
    "gameId": "29d9ec63-d87d-49f2-a894-24b3d86a8000",
    "gameName": "Justin Timberlake's Sri Lakshmi Battle Royale"
  }
]
```

---

### Add a new game

**Endpoint**: `/games`

**Method**: POST

**Description**: Post a new game to the `games` table. This will generate a `gameId` as a GUID for you and return it.

**Request Parameters**:
- `gameName`: The name of your game.

#### Request Example:

```
curl -X POST http://localhost:3000/games \
     -H "Content-Type: application/json" \
     -d '{"gameName": "Noodle Knight: A Slurppin' Good Time"}'
```

#### Example Success Response (HTTP 200): 
```
29d9ec63-d87d-49f2-a894-24b3d86a8000
```
