import pluralize from 'pluralize'

module.exports = {
  active: false,
  order: 100,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'group',
  file: __filename,
  command: async function ({ data, status }) {
    console.log({
      function: 'onCreateAndUpdateRequireNameToBePlural',
      data,
      status,
    })
    if (pluralize(data?.name) !== data?.name) {
      status.code = 'error'
      status.message = `Groups are for the many, try "${pluralize(
        data.name
      )}" plural.`
      return { data, status }
    }
    return { data, status }
  },
}
