-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "band_id" TEXT NOT NULL,
    CONSTRAINT "Track_band_id_fkey" FOREIGN KEY ("band_id") REFERENCES "bands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
