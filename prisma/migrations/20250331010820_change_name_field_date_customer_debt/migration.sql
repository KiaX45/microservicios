/*
  Warnings:

  - You are about to drop the column `Date` on the `CustomerDebt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerDebt" DROP COLUMN "Date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
