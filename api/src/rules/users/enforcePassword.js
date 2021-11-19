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
      var data = input.hashedPassword
      if (data.length === 0) {
        // if password is empty, remove it.
        delete input.hashedPassword
      } else if (data.length < 4) {
        status.code = 'error'
        status.message = 'Password not long enough.  Update not saved'
      }
    } catch (e) {
      logger.error(e)
    }
    return await { input, status }
  },
}
