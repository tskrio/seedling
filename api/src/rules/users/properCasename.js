import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 30,
  when: ['before'],
  operation: ['create', 'update'],
  title: 'properCaseName',
  table: 'user',
  file: __filename,
  command: async function (incomingData) {
    try {
      if (incomingData?.name) {
        let name = incomingData.name
        let firstCharacter = name.charAt(0)
        if (firstCharacter !== firstCharacter.toUpperCase()) {
          incomingData.name = name[0].toUpperCase() + name.substring(1)
        }
      }
    } catch (e) {
      logger.error(e)
    }
    return await incomingData
  },
}
