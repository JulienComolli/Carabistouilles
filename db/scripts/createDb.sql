CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(320) NOT NULL,
    user_desc VARCHAR(280),
    pass VARCHAR(80) NOT NULL,
    picture_path VARCHAR(80),
    creation_date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_connection DATE,
    account_state INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT u_users_username UNIQUE (username),
    CONSTRAINT u_users_email UNIQUE (email)
);

CREATE TABLE Games (
    id INTEGER PRIMARY KEY,
    game_name VARCHAR(30) NOT NULL,
    game_desc VARCHAR(280),
    CONSTRAINT u_games_gamename UNIQUE (game_name)
);
