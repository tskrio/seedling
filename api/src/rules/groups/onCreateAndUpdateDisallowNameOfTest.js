module.exports = {
  active: true,
  order: 101,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'group',
  file: __filename,
  command: async function ({ data, status, cuid }) {
    if (data.name == 'test') {
      status.code = 'failure'
      status.message = 'no groups named test'
    }
    return { data, status, cuid }
  },
}
