/*
  Warnings:

  - Changed the type of `area` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Area" AS ENUM ('Ставропольский край', 'Ростовская область', 'Краснодарский край');

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "area",
ADD COLUMN     "area" "public"."Area" NOT NULL;
