// To access your database
//import { db } from '$api/src/lib/db'
import * as source from '../node_modules/.prisma/client/index'
///node_modules/.prisma/client/index.d.ts'
import pluralize from '../node_modules/pluralize'
let getTables = () => {
  let returnTables = []
  for (let table in source.ModelName) {
    //console.log(source.ModelName[table])
    returnTables.push(table)
  }
  return returnTables
}
let getTable = (tableName) => {
  let table = source.dmmf.datamodel.models.filter((model) => {
    //console.log(tableName, model)
    if (model?.name === tableName) return true
    else return false
  })
  if (table.length === 0) {
    console.log(`No tables, try these, ${getTables().join(' ')}`)
  }
  return table
}
let generateSDLSingleType = (tableName, fields, content) => {
  content.push(`type ${pluralize.singular(tableName)} {`)
  let required = (isRequired) => {
    if (isRequired) {
      return isRequired ? '!' : ''
    } else {
      return ''
    }
  }
  fields.forEach((field) => {
    content.push(
      `\t\t${field.name}: ${field.type}${required(field.isRequired)}`
    )
  })
  content.push(`\t}`)
}
let generateSDLPluralType = (table, content) => {
  content.push(`type ${pluralize(table)} {`)
  content.push(`\tresults: [${pluralize.singular(table)}!]!`)
  ;['count', 'take', 'skip'].forEach((column) => {
    content.push(`\t\t${column}: Int!`)
  })
  content.push(`\t\tq: String`)
  content.push(`\t}`)
}
let generateSDLQuery = (table) => {}

let generateSDL = async (table) => {
  console.log('in generate sdl')
  let singular = pluralize.singular(table.name)
  let plural = table.name
  const SDLPATH = `/api/graphql/${plural.toLowerCase()}.sdl.js`
  //console.log(SDLPATH, table)
  let content = []
  content.push('export const schema = gql`')
  generateSDLSingleType(table.name, table.fields, content)
  content.push(``)
  generateSDLPluralType(plural, content)
  console.log(content)
}
export default async ({ args }) => {
  console.log(':: Executing script with args ::')
  //console.log('tables', getTables())
  console.log(source.dmmf.mappings)
  let tableInput = pluralize.singular(args._[1])
  if (tableInput) {
    let table = getTable(tableInput)[0]
    generateSDL(table)
    // create api/sdl
    // create api/service
    // create web/page
    // create web/component/editTable
    // create web/component/TablesCell
    // create web/component/newTable
    table.fields.forEach((field) => {
      //console.log(field)
    })
  }
}
