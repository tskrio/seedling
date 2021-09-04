/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskNote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assignmentGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_createdById_fkey";

-- DropForeignKey
ALTER TABLE "TaskNote" DROP CONSTRAINT "TaskNote_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskNote" DROP CONSTRAINT "TaskNote_userId_fkey";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "TaskNote";
