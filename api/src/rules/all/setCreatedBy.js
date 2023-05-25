import { logger } from 'src/lib/logger'

module.exports = {
  active: true,
  order: 1,
  when: ['before'],
  operation: ['create'],
  table: 'all',
  file: __filename,
  command: async function ({ data, status }) {
    try {
      console.log({ user: context.currentUser })
      data.createdBy = context.currentUser.username
      data.updatedBy = context.currentUser.username
    } catch (e) {
      logger.error(e)
    }
    return { data, status }
  },
}
