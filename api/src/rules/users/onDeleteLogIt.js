//import { db } from 'src/lib/db'
import { log } from 'src/lib/util'
module.exports = {
  active: true,
  order: 1,
  when: ['after'],
  operation: ['delete'],
  table: 'user',
  file: __filename,
  command: async function ({ data }) {
    await log(`Deleted ${data.name}`, `api\\${__filename.split('\\dist\\')[1]}`)
    return { data }
  },
}
