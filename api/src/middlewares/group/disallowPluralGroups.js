import { logger } from 'src/lib/logger'
import pluralize from 'pluralize'
import { ForbiddenError } from '@redwoodjs/graphql-server'
module.exports = {
  active: true,
  order: 100,
  title: 'disallow plural names',
  when: ['before'],
  type: ['update', 'create'],
  file: __filename,
  command: async function (incomingData) {
    try {
      console.log('incomingData', JSON.stringify(incomingData, null, 2))
      if (incomingData?.args?.data) {
        //throw 'No way, no plural'
        let name = incomingData.args.data.name
        // loop over words and if any part are plural stop
        let words = name.split(' ')
        words.forEach((word) => {
          let wordLower = word.toLowerCase()
          if (pluralize(wordLower) === wordLower) {
            throw 'no way no how'
            //throw new ForbiddenError('Disallow Plural Names')
          }
        })
      }
    } catch (e) {
      logger.error(e)
    }
    //return await incomingData
    return {
      error: 'error -  this is junk',
      errorObj: new Error('this is an error'),
    }
  },
}
