import { logger } from 'src/lib/logger'
module.exports = {
  command: async function (incomingData) {
    try {
      console.log('incomingData', incomingData)
      incomingData.name = incomingData.name.toUpperCase()
    } catch (e) {
      logger.error(e)
    }
    return incomingData
  },
  active: true,
  order: 10,
  when: ['before'],
  type: ['create'],
  file: __filename,
}
