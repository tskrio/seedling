const { db } = require('../../lib/db')
module.exports = {
  active: true,
  order: 1,
  when: ['before'],
  operation: ['delete'],
  table: 'user',
  file: __filename,
  command: async function ({ id, status }) {
    console.log('context', context)
    let record = await db.user.findUnique({
      where: { id },
    })
    if (
      record.email == 'admin@example.com' ||
      record.email == 'manager@example.com' ||
      record.email == 'employee@example.com'
    ) {
      status.code = 'failure'
      status.message = `${record.name} are protected, cannot delete`
    }
    return await { id, status }
  },
}
