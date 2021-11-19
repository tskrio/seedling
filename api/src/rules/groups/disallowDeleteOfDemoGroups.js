const { db } = require('../../lib/db')

module.exports = {
  active: true,
  order: 101,
  when: ['before'],
  operation: ['delete'],
  table: 'group',
  file: __filename,
  command: async function ({ id, status }) {
    let record = await db.group.findUnique({
      where: { id },
    })
    if (
      record.name == 'Administrators' ||
      record.name == 'Managers' ||
      record.name == 'Employees'
    ) {
      status.code = 'failure'
      status.message = `${record.name} are protected, cannot delete`
    }
    return await { id, status }
  },
}
