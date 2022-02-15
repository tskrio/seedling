import { db } from 'src/lib/db'

module.exports = {
  active: true,
  order: 1,
  when: ['before'],
  operation: ['delete'],
  table: 'user',
  file: __filename,
  command: async function ({ id, status }) {
    let record = await db.user.findUnique({
      where: { id },
    })

    if (record?.name?.toLowerCase() === 'tron') {
      status.code = 'error'
      status.message = `You can't delete ${record?.name}, he fights for the user`
    }
    return { id, status }
  },
}
