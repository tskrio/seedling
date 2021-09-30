import { logger } from 'src/lib/logger'
module.exports = {
  command: async function (incomingData) {
    try {
      if (incomingData?.args?.data) {
        console.log('incomingData', incomingData)
        if (incomingData.args.data.name == 'examplename') {
          incomingData.args.data.name = 'anUpdatedExample'
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
  type: ['update'],
  name: 'renameName',
  file: __filename,
}
