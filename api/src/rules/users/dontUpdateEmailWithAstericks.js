import { logger } from 'src/lib/logger'

module.exports = {
  active: true,
  order: 1,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'user',
  file: __filename,
  command: async function ({ input, status }) {
    try {
      if (input.email?.includes('*')) {
        // if password is empty, remove it.
        delete input.email
      }
    } catch (e) {
      logger.error(e)
    }
    return await { input, status }
  },
}
