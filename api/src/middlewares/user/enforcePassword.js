import { logger } from 'src/lib/logger'
module.exports = {
  active: false,
  order: 1,
  title: 'enforce Password',
  when: ['before'],
  type: ['update', 'create'],
  name: 'enforce password > 4 characters',
  file: __filename,
  command: async function (incomingData) {
    try {
      var data = incomingData?.args?.data.hashedPassword
      if (data.length < 4) {
        console.log('password less than 4')
        //incomingData.action = read;
        delete incomingData?.args?.data.hashedPassword
        incomingData.__abort = true

        return 'invalid value'
      }
    } catch (e) {
      logger.error(e)
    }
    return await incomingData
  },
}
