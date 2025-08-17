/*
  Warnings:

  - Changed the type of `type` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."VehicleType" AS ENUM ('ФУРА', 'РЕФРЕЖЕРАТОР', 'КОНТЕЙНЕРОВОЗ', 'БОРТОВОЙ', 'Т10', 'Т5', 'ГАЗЕЛЬ');

-- AlterTable
ALTER TABLE "public"."Vehicle" DROP COLUMN "type",
ADD COLUMN     "type" "public"."VehicleType" NOT NULL;
