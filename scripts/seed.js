/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client'

import { groups } from './seedFiles/groupSeed'
import { messages } from './seedFiles/messageSeed'
import { properties } from './seedFiles/propertySeed'
import { users, bulkUsers } from './seedFiles/userSeed'

const dotenv = require('dotenv')
dotenv.config()
//const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()
async function main() {
  await db.groupRole.deleteMany({})
  for (let group of groups) {
    await db.group.upsert({
      where: { id: group.id },
      update: group,
      create: group,
    })
  }
  //users.map((user) => user?.email)
  await db.user.deleteMany(/*{ where: { email: { in: userEmails } } }*/)
  //await db.user.createMany({ data: bulkUsers })
  for (let user of bulkUsers) {
    await db.user.create({
      data: user,
    })
  }

  for (let user of users) {
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
  for (let property of properties) {
    await db.property.create({
      data: property,
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
