/* eslint-disable no-console */
const dotenv = require('dotenv')
dotenv.config()
const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()
import { users, bulkUsers } from './seedFiles/userSeed'
import { groups } from './seedFiles/groupSeed'
import { messages } from './seedFiles/messageSeed'

async function main() {
  await db.groupRole.deleteMany({})
  for (let group of groups) {
    await db.group.upsert({
      where: { id: group.id },
      update: group,
      create: group,
    })
  }
  users.map((user) => user.email)
  await db.user.deleteMany(/*{ where: { email: { in: userEmails } } }*/)
  for (let user of users) {
    await db.user.create({
      data: user,
    })
  }
  //await db.user.createMany({ data: bulkUsers })
  for (let user of bulkUsers) {
    await db.user.create({
      data: user,
    })
  }
  await db.message.deleteMany({})
  for (let message of messages) {
    await db.message.create({
      data: message,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
