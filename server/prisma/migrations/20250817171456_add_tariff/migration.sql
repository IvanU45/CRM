-- CreateEnum
CREATE TYPE "public"."RateType" AS ENUM ('кг', 'км', 'кгкм');

-- CreateTable
CREATE TABLE "public"."Tariff" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "rateType" "public"."RateType" NOT NULL,
    "minPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tariff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Tariff" ADD CONSTRAINT "Tariff_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
