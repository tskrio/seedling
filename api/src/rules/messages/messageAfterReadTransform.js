module.exports = {
  active: true,
  order: 10,
  when: ['after'],
  operation: ['readAll'],
  table: 'message',
  file: __filename,
  command: async function ({ data, status }) {
    data = data.map((m) => {
      if (m.value.length > 3) {
        m.value = m.value.substr(0, 3) + '...'
      }
    })
    return { data, status }
  },
}
