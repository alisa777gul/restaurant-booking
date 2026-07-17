/*
  Warnings:

  - A unique constraint covering the columns `[date,time]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `guests` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `serviceId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_serviceId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "guests",
ADD COLUMN     "guests" INTEGER NOT NULL,
ALTER COLUMN "serviceId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_date_time_key" ON "Reservation"("date", "time");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
