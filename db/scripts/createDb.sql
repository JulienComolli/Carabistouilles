CREATE TABLE Users (
    Id INT PRIMARY KEY NOT NULL,
    Username VARCHAR(20) NOT NULL,
    Email VARCHAR(320) NOT NULL,
    UserDesc VARCHAR(280),
    Pass VARCHAR(80) NOT NULL,
    PicturePath VARCHAR(80),
    AccountState INTEGER NOT NULL,
    UNIQUE (Username),
    UNIQUE (Email)
);

CREATE TABLE Games (
    Id INT PRIMARY KEY NOT NULL,
    GameName VARCHAR(30) NOT NULL,
    GameDesc VARCHAR(280),
    UNIQUE (GameName)
);
