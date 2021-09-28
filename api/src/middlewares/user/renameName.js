import { logger } from 'src/lib/logger'
module.exports = {
  command: async function (incomingData) {
    try {
      console.log('incomingData', incomingData)
      if (incomingData?.name == 'examplename') {
        incomingData.name = 'anUpdatedExample'
      }
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
