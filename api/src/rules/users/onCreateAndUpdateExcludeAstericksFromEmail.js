import { logger } from 'src/lib/logger'

module.exports = {
  active: true,
  order: 1,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'user',
  file: __filename,
  command: async function ({ data, status }) {
    console.log('exclude astericks', data, status)
    try {
      if (data.email?.includes('*')) {
        // if password is empty, remove it.
        delete data.email
      }
    } catch (e) {
      logger.error(e)
    }
    return await { data, status }
  },
}
