-- AlterTable
ALTER TABLE "RestaurantSettings" ALTER COLUMN "name" SET DEFAULT 'Restaurant';

-- AlterTable
ALTER TABLE "TimeSlot" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;
