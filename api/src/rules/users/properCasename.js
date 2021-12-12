import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 30,
  when: ['before'],
  operation: ['create', 'update'],
  table: 'user',
  file: __filename,
  command: async function ({ input, status }) {
    try {
      if (input?.name) {
        let name = input.name
        let firstCharacter = name.charAt(0)
        if (firstCharacter !== firstCharacter.toUpperCase()) {
          input.name = name[0].toUpperCase() + name.substring(1)
        }
      }
    } catch (e) {
      logger.error(e)
    }
    return await { input, status }
  },
}
