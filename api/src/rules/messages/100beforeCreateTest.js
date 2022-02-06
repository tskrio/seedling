module.exports = {
  active: true,
  order: 100,
  when: ['before'],
  operation: ['create'],
  table: 'message',
  file: __filename,
  command: async function ({ data, status }) {
    if (data.entity == 'test') {
      data.entity = data.entity + 1 + '...'
      status.code = 'failure'
      status.message = 'no entity named test'
    }
    return { data, status }
  },
}
