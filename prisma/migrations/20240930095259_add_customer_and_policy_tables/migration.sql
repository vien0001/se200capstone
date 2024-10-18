/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Policy` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nric]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nric` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "nric" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "createdAt";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_nric_key" ON "Customer"("nric");
