CREATE TABLE Users (
    Id INT NOT NULL,
    Username VARCHAR(20) NOT NULL,
    Email VARCHAR(320) NOT NULL,
    UserDesc VARCHAR(280),
    Pass VARCHAR(80) NOT NULL,
    PicturePath VARCHAR(80),
    AccountState INTEGER NOT NULL,
    CONSTRAINT PK_Users PRIMARY KEY (Id),
    CONSTRAINT U_Users_Username UNIQUE (Username),
    CONSTRAINT U_Users_Email UNIQUE (Email)
);

CREATE TABLE Games (
    Id INT NOT NULL,
    GameName VARCHAR(30) NOT NULL,
    GameDesc VARCHAR(280),
    CONSTRAINT PK_Games PRIMARY KEY (Id),
    CONSTRAINT U_Games_GameName UNIQUE (GameName)
);
