/*
  Warnings:

  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Group` table. All the data in the column will be lost.
  - The primary key for the `GroupMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupId` on the `GroupMember` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `GroupMember` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `GroupMember` table. All the data in the column will be lost.
  - The primary key for the `GroupRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupId` on the `GroupRole` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `GroupRole` table. All the data in the column will be lost.
  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Log` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Message` table. All the data in the column will be lost.
  - The primary key for the `Preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Preference` table. All the data in the column will be lost.
  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `entity` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Property` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userCuid,groupCuid]` on the table `GroupMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupCuid,role]` on the table `GroupRole` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[entity,userCuid]` on the table `Preference` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - The required column `cuid` was added to the `Group` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cuid` was added to the `GroupMember` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `groupCuid` to the `GroupMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCuid` to the `GroupMember` table without a default value. This is not possible if the table is not empty.
  - The required column `cuid` was added to the `GroupRole` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `groupCuid` to the `GroupRole` table without a default value. This is not possible if the table is not empty.
  - The required column `cuid` was added to the `Log` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cuid` was added to the `Message` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cuid` was added to the `Preference` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userCuid` to the `Preference` table without a default value. This is not possible if the table is not empty.
  - The required column `cuid` was added to the `Property` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Property` table without a default value. This is not possible if the table is not empty.
  - The required column `cuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "GroupRole" DROP CONSTRAINT "GroupRole_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_userId_fkey";

-- DropIndex
DROP INDEX "GroupMember_userId_groupId_key";

-- DropIndex
DROP INDEX "GroupRole_groupId_role_key";

-- DropIndex
DROP INDEX "Preference_entity_userId_key";

-- DropIndex
DROP INDEX "Property_entity_key";

-- AlterTable
ALTER TABLE "Group" DROP CONSTRAINT "Group_pkey",
DROP COLUMN "id",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("cuid");

-- AlterTable
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_pkey",
DROP COLUMN "groupId",
DROP COLUMN "id",
DROP COLUMN "userId",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "groupCuid" TEXT NOT NULL,
ADD COLUMN     "userCuid" TEXT NOT NULL,
ADD CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("cuid");

-- AlterTable
ALTER TABLE "GroupRole" DROP CONSTRAINT "GroupRole_pkey",
DROP COLUMN "groupId",
DROP COLUMN "id",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "groupCuid" TEXT NOT NULL,
ADD CONSTRAINT "GroupRole_pkey" PRIMARY KEY ("cuid");

-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
DROP COLUMN "id",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("cuid");

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "id",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("cuid");

-- AlterTable
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_pkey",
DROP COLUMN "id",
DROP COLUMN "userId",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "userCuid" TEXT NOT NULL,
ADD CONSTRAINT "Preference_pkey" PRIMARY KEY ("cuid");

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
DROP COLUMN "entity",
DROP COLUMN "id",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("cuid");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_userCuid_groupCuid_key" ON "GroupMember"("userCuid", "groupCuid");

-- CreateIndex
CREATE UNIQUE INDEX "GroupRole_groupCuid_role_key" ON "GroupRole"("groupCuid", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_entity_userCuid_key" ON "Preference"("entity", "userCuid");

-- CreateIndex
CREATE UNIQUE INDEX "Property_name_key" ON "Property"("name");

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupCuid_fkey" FOREIGN KEY ("groupCuid") REFERENCES "Group"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRole" ADD CONSTRAINT "GroupRole_groupCuid_fkey" FOREIGN KEY ("groupCuid") REFERENCES "Group"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;
