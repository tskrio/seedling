import { db } from 'src/lib/db'

module.exports = {
  active: true,
  order: 10,
  when: ['before'],
  operation: ['delete'],
  table: 'user',
  file: __filename,
  command: async function ({ cuid, status }) {
    let record = await db.user.findUnique({
      where: { cuid },
    })

    if (record?.name?.toLowerCase() === 'jace') {
      status.code = 'error'
      status.message = `You cannot ${record?.name}, he made this.`
    }
    return { cuid, status }
  },
}
