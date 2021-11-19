import { logger } from 'src/lib/logger'

module.exports = {
  active: true,
  order: 1,
  title: 'stop delete',
  when: ['before'],
  operation: ['delete'],
  table: 'user',
  file: __filename,
  command: async function (input, dbName, id) {
    // id: 12
    try {
      input._error = {
        message: `Stop delete user ${id}`,
      }
    } catch (e) {
      logger.error(e)
    }
    return await input
  },
}
