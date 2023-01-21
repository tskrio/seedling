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
  command: async function ({ data }) {
    try {
      console.log({ function: 'onCreateSetupSoleUserAsAdmin', data })
      // if this is the only user, make them an admin
      // on create, check if this is the only user, if so,
      // create a admin group
      // create a admin group role
      // create a group membership
      let adminGroupId = 'qx784aq3cef0rsf5yytif7fq'
      const users = await db.user.findMany({})
      if (users.length === 1) {
        for (let group of groups) {
          await db.group.upsert({
            where: { cuid: group.cuid },
            update: group,
            create: group,
          })
        }
        let groupMemberDate = {
          userCuid: data.cuid,
          groupCuid: adminGroupId,
        }
        await db.groupMember.create({
          data: groupMemberDate,
        })
        for (let property of properties) {
          await db.property.upsert({
            where: { name: property.name },
            create: property,
            update: property,
          })
        }
      }
    } catch (e) {
      logger.error(e)
    }
    return await { data }
  },
}
