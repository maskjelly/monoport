/*
  Warnings:

  - The `phone_number` column on the `CustomerDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CustomerDetails" DROP COLUMN "phone_number",
ADD COLUMN     "phone_number" INTEGER;
