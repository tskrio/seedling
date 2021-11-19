import pluralize from 'pluralize'

module.exports = {
  active: true,
  order: 100,
  title: 'disallow plural names',
  when: ['before'],
  operation: ['update', 'create'],
  table: 'group',
  file: __filename,
  command: async function (input) {
    input._error = 'Noooo!'
    return input
  },
}
