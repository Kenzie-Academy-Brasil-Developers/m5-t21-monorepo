/*
  Warnings:

  - Added the required column `isbn` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "isbn" VARCHAR(13) NOT NULL;
