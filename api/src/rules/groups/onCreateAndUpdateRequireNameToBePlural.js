import pluralize from 'pluralize'

module.exports = {
  active: true,
  order: 100,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'group',
  file: __filename,
  command: async function ({ data, status }) {
    if (pluralize(data?.name) !== data?.name) {
      status.code = 'error'
      status.message = `Groups are for the many, try "${pluralize(
        data.name
      )}" plural.`
      return { status }
    }
    return { data, status }
  },
}
