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
    try {
      console.log('in group rule')
      input._error = 'setbyrule'
    } catch (e) {
      throw 'test'
    }
    return await input
  },
}
