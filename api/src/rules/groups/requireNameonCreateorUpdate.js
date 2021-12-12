module.exports = {
  active: true,
  order: 101,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'group',
  file: __filename,
  command: async function ({ input, status }) {
    if (input.name == '') {
      status.code = 'failure'
      status.message = 'Name is required (server validation)'
    }
  },
}
