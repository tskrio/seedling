import { logger } from 'src/lib/logger'

module.exports = {
  active: true,
  order: 1,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'user',
  file: __filename,
  command: async function ({ data, status }) {
    try {
      if (data?.name?.toLowerCase() === 'test') {
        // if password is empty, remove it.
        status.code = 'error'
        status.message = `You cannot use ${data.name} as a user name`
        return { status }
      }
    } catch (e) {
      logger.error(e)
    }
    return { data, status }
  },
}
