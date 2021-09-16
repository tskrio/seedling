-- CreateEnum
CREATE TYPE "Role" AS ENUM ('taskCreate', 'taskRead', 'taskUpdate', 'taskDelete', 'userCreate', 'userRead', 'userUpdate', 'userDelete', 'groupCreate', 'groupRead', 'groupUpdate', 'groupDelete', 'groupMemberCreate', 'groupMemberRead', 'groupMemberUpdate', 'groupMemberDelete', 'userRoleCreate', 'userRoleRead', 'userRoleUpdate', 'userRoleDelete');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferences" JSONB NOT NULL DEFAULT E'{}';

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRole" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
