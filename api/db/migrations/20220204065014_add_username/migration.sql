/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email" SET DEFAULT E'',
ALTER COLUMN "hashedPassword" DROP NOT NULL,
ALTER COLUMN "salt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
