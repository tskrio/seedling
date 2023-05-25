import { getCurrentUser, requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

module.exports = {
  active: true,
  order: 1,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'preference',
  file: __filename,
  command: async function ({ data, status }) {
    try {
      let roles = context.currentUser.roles
      console.log({ roles })
      if(roles.includes('admin')) {
      // if entity has "j" in it, remove it.
        if (data?.entity?.includes('j')) {
          data.entity = data.entity.replace('j', '')
        }
      }
    } catch (e) {
      logger.error(e)
    }
    return { data, status }
  },
}
