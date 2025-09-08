/*
  Warnings:

  - You are about to drop the column `status` on the `Movie` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL
);
INSERT INTO "new_Movie" ("id", "title", "year") SELECT "id", "title", "year" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
