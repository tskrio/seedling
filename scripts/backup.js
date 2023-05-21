import { db } from 'api/src/lib/db'
const fs = require('fs')
const path = require('path')
let generateDateString = () => {
  let date = new Date()
  let year = date.getFullYear()
  // month and day should be padded with a 0 if it's less than 10
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let dateString = `${year}-${month}-${day}`
  return dateString
}
let verifySeedFilesDir = () => {
  // if ./scripts/seedFiles/ doesn't exist, create it
  if (!fs.existsSync(path.join(process.cwd(), './scripts/seedFiles/'))) {
    fs.mkdirSync(path.join(process.cwd(), './scripts/seedFiles/'))
  }
}
let verifyDatedBackupDir = ({ dateString }) => {
  // if ./scripts/seedFiles/backup-<date>/ doesn't exist, create it
  let dirName = `./scripts/seedFiles/backup-${dateString}`
  if (!fs.existsSync(path.join(process.cwd(), dirName))) {
    fs.mkdirSync(path.join(process.cwd(), dirName))
  }
  return dirName
}

let getTables = async ({ db }) => {
  // first thing we need to do is get a list of all the tables in the database
  const tables = await db.$queryRaw`SELECT table_name
  FROM information_schema.tables
  WHERE table_schema='public'
  AND table_type='BASE TABLE';`
  return tables
}
let createBackupFile = async ({ directory, tableName }) => {
  // first character of tableName is always uppercase
  const firstLetter = tableName[0]
  const restOfName = tableName.slice(1)
  const tableNameCamelCase = firstLetter.toLowerCase() + restOfName
  // now we need to get the data from each table
  const data = await db[tableNameCamelCase]?.findMany({})
  if (!data) {
    console.log('⛔ no data for', tableNameCamelCase)
    return
  }
  console.log('💾 backing up table', tableNameCamelCase)
  fs.writeFileSync(
    path.join(
      process.cwd(),
      `${directory}/${tableName}.json`
    ),
    JSON.stringify(data, null, 2)
  )


}







export default async ({ args }) => {

  console.log(':: Executing script with args ::')
  console.log(args)
  verifySeedFilesDir()
  var directory = verifyDatedBackupDir({ dateString: generateDateString() })
  let tables = await getTables({ db })
  // now we need to get the data from each table
  const data = await Promise.all(
    tables.map(async (table) => {
      let tableName = table.table_name
      try {
        await createBackupFile({
          directory,
          tableName,
        })

      } catch (error) {
        console.log('error', error)
      }
    })
  )
  console.log(':: Done ::')
}
