import { watch } from 'fs'

export const watchAndLog = (() => {
  console.log('cwd', process.cwd())
  watch('./api/src/emails/', (eventType, filename) => {
    if (filename.includes('.mjml.js')) {
      //console.log(eventType)
      //console.log('files I care about')
      // could be either 'rename' or 'change'. new file event and delete
      // also generally emit 'rename'

      //console.log(allRules)
      console.log(filename)
    }
  })
})()

export default watchAndLog
