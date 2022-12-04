import { db } from 'src/lib/db'
import { groups, properties } from 'src/lib/initialRecords'
import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 10,
  when: ['after'],
  operation: ['create'],
  table: 'user',
  file: __filename,
  command: async function ({ record }) {
    try {
      // if this is the only user, make them an admin
      // on create, check if this is the only user, if so,
      // create a admin group
      // create a admin group role
      // create a group membership
      const users = await db.user.findMany({})
      if (users.length === 1) {
        for (let group of groups) {
          await db.group.upsert({
            where: { id: group.id },
            update: group,
            create: group,
          })
        }
        await db.groupRole.create({
          data: {
            role: 'admin',
            groupId: 1,
          },
        })
        await db.groupMember.create({
          data: {
            userId: record.id,
            groupId: 1,
          },
        })
        for (let property of properties) {
          await db.property.create({
            data: property,
          })
        }
      }
    } catch (e) {
      logger.error(e)
    }
    return await { record }
  },
}
