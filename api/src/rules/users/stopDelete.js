import { logger } from 'src/lib/logger'

module.exports = {
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
  active: true,
  order: 1,
  title: 'stop delete',
  when: ['before'],
  type: ['delete'],
  name: __filename,
  file: __filename,
}
