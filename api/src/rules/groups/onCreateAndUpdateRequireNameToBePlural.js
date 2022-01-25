import pluralize from 'pluralize'

module.exports = {
  active: true,
  order: 100,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'group',
  file: __filename,
  command: async function ({ input, status }) {
    if (pluralize(input?.name) !== input?.name) {
      status.code = 'error'
      status.message = `Groups are for the many, try "${pluralize(
        input.name
      )}" plural.`
    }
    return await { input, status }
  },
}
