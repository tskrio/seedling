/*
  Warnings:

  - The values [userRoleCreate,userRoleRead,userRoleUpdate,userRoleDelete] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'taskCreate', 'taskRead', 'taskUpdate', 'taskDelete', 'userCreate', 'userRead', 'userUpdate', 'userDelete', 'groupCreate', 'groupRead', 'groupUpdate', 'groupDelete', 'groupMemberCreate', 'groupMemberRead', 'groupMemberUpdate', 'groupMemberDelete', 'groupRoleCreate', 'groupRoleRead', 'groupRoleUpdate', 'groupRoleDelete');
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropTable
DROP TABLE "UserRole";
