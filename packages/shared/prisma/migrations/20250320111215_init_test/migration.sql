/*
  Warnings:

  - You are about to drop the column `userId` on the `ClientBookings` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientBookings" DROP CONSTRAINT "ClientBookings_userId_fkey";

-- AlterTable
ALTER TABLE "ClientBookings" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";
