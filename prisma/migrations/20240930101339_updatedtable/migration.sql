/*
  Warnings:

  - You are about to drop the column `nric` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_customerId_fkey";

-- DropIndex
DROP INDEX "Customer_nric_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "nric";

-- AlterTable
ALTER TABLE "Policy" ALTER COLUMN "basePrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
