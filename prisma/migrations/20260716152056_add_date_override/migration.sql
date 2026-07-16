-- CreateTable
CREATE TABLE "DateOverride" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "open" TEXT,
    "close" TEXT,
    "slotDuration" INTEGER,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateOverride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DateOverride_date_key" ON "DateOverride"("date");
