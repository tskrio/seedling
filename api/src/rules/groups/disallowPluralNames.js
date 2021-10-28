import { logger } from 'src/lib/logger'
import pluralize from 'pluralize';

module.exports = {
  command: async function (incomingData) {
    try {
      let data = incomingData.name;
      // loop over words and if any part are plural stop
      let words = data.split(' ' );
      words.forEach((word)=>{
        let wordLower = word.toLowerCase()
        if(pluralize(wordLower) === wordLower){
          incomingData._error = {
            abort : true,
            message : `${word} is plural, that's not allowed in names of groups`
          }
        }
      })
    } catch (e) {
      logger.error(e)
    }
    return await incomingData
  },
  active: true,
  order: 100,
  title: 'disallow plurla names',
  when: ['before'],
  type: ['update', 'create'],
  file: __filename,
}
