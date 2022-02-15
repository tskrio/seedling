import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 30,
  when: ['before'],
  operation: ['create', 'update'],
  table: 'user',
  file: __filename,
  command: async function ({ data, status }) {
    try {
      if (data?.name) {
        let name = data.name
        let firstCharacter = name.charAt(0)
        if (firstCharacter !== firstCharacter.toUpperCase()) {
          data.name = name[0].toUpperCase() + name.substring(1)
        }
      }
      return { data, status }
    } catch (e) {
      console.log('oncreateandupdatepropercasename', e)
      logger.error(e)
    }
  },
}
