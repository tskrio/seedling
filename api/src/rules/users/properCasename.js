import { logger } from 'src/lib/logger'
module.exports = {
  command: async function (incomingData) {
    try {
      if (incomingData?.name) {
        let name = incomingData.name
        let firstCharacter = name.charAt(0);
        if (firstCharacter !== firstCharacter.toUpperCase()) {
          incomingData.name = name[0].toUpperCase() + name.substring(1)
        }
      }
    } catch (e) {
      logger.error(e)
    }
    return await incomingData
  },
  active: true,
  order: 30,
  when: ['before'],
  type: ['create','update'],
  name: 'properCaseName',
  file: __filename,
}
