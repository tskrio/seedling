import { logger } from 'src/lib/logger'
module.exports = {
  command: async function (incomingData) {
    console.log('IN toUpperCaseName RULE')
    console.log('incomingData', JSON.stringify(incomingData,null,2))
    try {
      if (incomingData?.args?.data) {
        console.log('incomingData', JSON.stringify(incomingData,null,2))
        incomingData.args.data.name = incomingData.args.data.name.toUpperCase()
      }
    } catch (e) {
      logger.error(e)
    }
    console.log('ENDING toUpperCaseName RULE')
    return await incomingData
  },
  active: true,
  order: 40,
  when: ['before'],
  type: ['update'],
  name: 'toUpperCaseName',
  file: __filename,
}
