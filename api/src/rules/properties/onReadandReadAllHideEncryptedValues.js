import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 10,
  when: ['after'],
  operation: ['readAll', 'read'],
  table: 'property',
  file: __filename,
  command: async function (records) {
    try {
      // if type is encrypted, delete it from the data
      if (Array.isArray(records)) {
        return await records.map((record) => {
          if (record.type === 'encrypted') {
            delete record.value
          }
          return record
        })
      }
      if (Array.isArray(records) === false) {
        if (records.type === 'encrypted') {
          delete records.value
        }
      }
    } catch (e) {
      logger.error(e)
    }
    return await { records }
  },
}
