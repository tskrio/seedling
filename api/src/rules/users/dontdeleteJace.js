import { db } from 'src/lib/db'

module.exports = {
  active: true,
  order: 10,
  when: ['before'],
  operation: ['delete'],
  table: 'user',
  file: __filename,
  command: async function ({ id, status }) {
    let record = await db.user.findUnique({
      where: { id },
    })

    if (record?.name?.toLowerCase() === 'jace') {
      status.code = 'error'
      status.message = `You cannot ${record?.name}, he made this.`
    }
    return { id, status }
  },
}
