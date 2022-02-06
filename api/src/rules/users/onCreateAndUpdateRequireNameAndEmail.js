module.exports = {
  active: false,
  order: 100,
  when: ['before'],
  operation: ['create', 'update'],
  table: 'user',
  file: __filename,
  command: async function ({ input, status }) {
    if (input.email == '' || input.name == '') {
      status.code = 'failure'
      status.message = `Email and Name are required`
    }
    return await { input, status }
  },
}
