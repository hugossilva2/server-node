-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximus_attendees" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Evento_slug_key" ON "Evento"("slug");
