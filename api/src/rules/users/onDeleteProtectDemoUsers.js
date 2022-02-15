import { db } from 'src/lib/db'
module.exports = {
  active: false,
  order: 1,
  when: ['before'],
  operation: ['delete'],
  table: 'user',
  file: __filename,
  command: async function ({ id, status }) {
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
