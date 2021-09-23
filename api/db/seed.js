/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

/*
 * Seed data is database data that needs to exist for your app to run.
 *
 * @see https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-reset
 * @see https://www.prisma.io/docs/guides/prisma-guides/seed-database
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
 */
async function main() {
  const resultUsers = await db.user.createMany({
    data: [
      {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin',
      },
      {
        id: 2,
        email: 'manager@example.com',
        name: 'Employee',
      },
      {
        id: 3,
        email: 'employee@example.com',
        name: 'Employee',
      },
    ],
    skipDuplicates: true, // Supported with Postgres database
  })
  console.log(`Created ${resultUsers.count} users!`)

  const resultGroups = await db.group.createMany({
    data: [
      {
        id: 1,
        name: 'Administrators',
        description: 'Users with admin privileges',
      },
      {
        id: 2,
        name: 'Managers',
        description: 'Users with CRUD on User, Group, and GroupMember',
      },
      {
        id: 3,
        name: 'Employees',
        description: 'Users with RU on User, and R on Group and GroupMember',
      },
    ],
  })
  console.log(`Created ${resultGroups.count} groups!`)

  const resultGroupMembers = await db.groupMember.createMany({
    data: [
      {
        userId: 1,
        groupId: 1,
      },
      {
        userId: 2,
        groupId: 2,
      },
      {
        userId: 3,
        groupId: 3,
      },
    ],
  })
  console.log(`Created ${resultGroupMembers.count} group members!`)

  const resultGroupRoles = await db.groupRole.createMany({
    data: [
      {
        groupId: 1,
        role: 'admin',
      },
      {
        groupId: 2,
        role: 'userCreate',
      },
      {
        groupId: 2,
        role: 'userRead',
      },
      {
        groupId: 2,
        role: 'userUpdate',
      },
      {
        groupId: 2,
        role: 'userDelete',
      },
      {
        groupId: 2,
        role: 'groupCreate',
      },
      {
        groupId: 2,
        role: 'groupRead',
      },
      {
        groupId: 2,
        role: 'groupUpdate',
      },
      {
        groupId: 2,
        role: 'groupDelete',
      },
      {
        groupId: 2,
        role: 'groupMemberCreate',
      },
      {
        groupId: 2,
        role: 'groupMemberRead',
      },
      {
        groupId: 2,
        role: 'groupMemberUpdate',
      },
      {
        groupId: 2,
        role: 'groupMemberDelete',
      },
      {
        groupId: 3,
        role: 'userRead',
      },
      {
        groupId: 3,
        role: 'userUpdate',
      },
      {
        groupId: 3,
        role: 'groupRead',
      },
      {
        groupId: 3,
        role: 'groupMemberRead',
      },
    ],
  })
  console.log(`Created ${resultGroupRoles.count} group roles!`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
