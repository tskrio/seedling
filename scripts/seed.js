/* eslint-disable no-console */

import { createId } from '@paralleldrive/cuid2'
import { PrismaClient } from '@prisma/client'

import group from './seedFiles/group.json'
import groupMember from './seedFiles/groupMember.json'
import groupRole from './seedFiles/groupRole.json'
import message from './seedFiles/message.json'
import property from './seedFiles/property.json'
import user from './seedFiles/user.json'

const dotenv = require('dotenv')
dotenv.config()
//const { PrismaClient } = require('@prisma/client')
const seed = {
  group,
  groupRole,
  user,
  groupMember,
  message,
  property,
}
const db = new PrismaClient()
async function main() {
  // loop through the seed object and console.log the name of the seed object
  // and the number of records in the seed object
  for (const [key, value] of Object.entries(seed)) {
    console.log(`${key}: ${value.length}`)
    // do a db upsert for each record in the seed object
    for (let record of value) {
      // if the record has a createdAt or updatedAt field, convert it to a date
      try {
        let recordData = {
          ...record,
          createdAt: (() => {
            if (record.createdAt) {
              return new Date(record.createdAt)
            }
            return new Date()
          })(),
          updatedAt: (() => {
            if (record.updatedAt) {
              return new Date(record.updatedAt)
            }
            return new Date()
          })(),
        }
        // do the upsert
        //console.log(`upserting ${key} ${record.id}`)
        if (record.cuid) {
          // do upsert
          await db[key].upsert({
            where: { cuid: record.cuid },
            update: recordData,
            create: recordData,
          })
        } else {
          // record has no id, show error in red
          console.log(
            '\x1b[31m%s\x1b[0m',
            `Update seed file ./scripts/seedFiles/${key}.json to include id`,
            createId()
          )
          console.log(`no id for ${key} ${JSON.stringify(record, null, 2)}`)
        }
      } catch (error) {
        console.log(error)
        console.log(`error upserting ${key} ${record?.id || record?.cuid}`)
        return
      }
    }
  }

  return
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
