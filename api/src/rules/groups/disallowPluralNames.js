import pluralize from 'pluralize'

module.exports = {
  active: true,
  order: 100,
  when: ['before'],
  operation: ['update', 'create'],
  table: 'group',
  file: __filename,
  command: async function ({ input, status }) {
    let words = input?.name.split(' ')
    words.forEach(async (word) => {
      let wordLower = word.toLowerCase()
      if (pluralize(wordLower) === wordLower) {
        status.code = 'error'
        status.message = 'disallow plural names'
      }
    })
    return await { input, status }
  },
}
