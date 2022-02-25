set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL default now(),
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "games" (
    "gameId" serial NOT NULL,
    "title" TEXT NOT NULL,
    "userId" integer NOT NULL,
    CONSTRAINT "games_pk" PRIMARY KEY ("gameId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "notes" (
    "noteId" serial NOT NULL,
    "note" TEXT NOT NULL,
    "userId" integer NOT NULL,
    "gameId" integer NOT NULL,
    CONSTRAINT "notes_pk" PRIMARY KEY ("noteId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "usersGames" (
    "userId" integer NOT NULL,
    "gameId" integer NOT NULL,
    "favorited" BOOLEAN NOT NULL,
    CONSTRAINT "usersGames_pk" PRIMARY KEY ("userId","gameId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "categories" (
    "categoryId" serial NOT NULL,
    "category" serial NOT NULL,
    CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "gamesCategories" (
    "categoryId" integer NOT NULL,
    "gameId" integer NOT NULL,
    CONSTRAINT "gamesCategories_pk" PRIMARY KEY ("categoryId","gameId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "games" ADD CONSTRAINT "games_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "notes" ADD CONSTRAINT "notes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "usersGames" ADD CONSTRAINT "usersGames_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "usersGames" ADD CONSTRAINT "usersGames_fk1" FOREIGN KEY ("gameId") REFERENCES "games"("gameId");
ALTER TABLE "gamesCategories" ADD CONSTRAINT "gamesCategories_fk0" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "gamesCategories" ADD CONSTRAINT "gamesCategories_fk1" FOREIGN KEY ("gameId") REFERENCES "games"("gameId");
