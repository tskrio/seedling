import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 10,
  when: ['after'],
  operation: ['readAll'],
  table: 'property',
  file: __filename,
  command: async function ({ data }) {
    try {
      console.log('readall', data)
      // if type is encrypted, delete it from the data
      return await data.map((record) => {
        if (record.type === 'hidden') {
          delete record.value
        }
        return record
      })
    } catch (e) {
      logger.error(e)
    }
    return await { data }
  },
}
