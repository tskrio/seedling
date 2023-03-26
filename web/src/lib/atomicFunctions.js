import { routes } from '@redwoodjs/router'
import pluralize from 'pluralize'
import camelCase from 'camelcase'

export const showMatching = (model, field, value) => {
  var _value = `"${value}"`
  if (field.dataType == 'integer') _value = value
  var _field = `"${field.accessor}"`
  if (field.field) _field = `"${field.accessor}": {"${field.field}"`
  if (field.field) _value = `${_value}}`
  return routes[model]({ q: `{${_field}: ${_value}}` })
}
export const filterOut = (model, field, value) => {
  var _value = `"${value}"`
  if (field.dataType == 'integer') _value = value
  var _field = `"${field.accessor}"`
  if (field.field) _field = `"${field.accessor}": {"${field.field}"`
  if (field.field) _value = `${_value}}`
  return routes[model]({ q: `{${_field}: {"not":${_value}}}` })
}
export const copy = (value) => {
  navigator.clipboard.writeText(value)
}
export const getSchema = async ({ table, form }) => {
  let endpoint = '/.redwood/functions/schema'
  if(form){ // append the form as a query parameter
    endpoint = `${endpoint}?form=${form}`
  }
  let response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      table,
    }),
  })
  let database = await response.json()
  if (database.error) throw new Error(database.error)
  return database
}
export const readGQL = ({ table, data }) => {
  // build the graphql query for one row
  let fields = ''
  data.schema.fields.forEach((field) => {
    if (!field.definition) {
      console.log({ 'message': 'no definition', table, field})
      throw new Error(`readGQL call for table ${table} definition missing`)
    }
    if (field.definition && !field.reference) {
      console.log({ 'message': 'no reference', table, field})
      fields += `\t\t\t${field.name}\n`
    }
    if (field.definition && field.reference && field?.definition?.display && field?.definition?.value) {
      console.log({ 'message': 'reference', table, field})
      fields += `\t\t\t${field.reference.name} {\n`
      fields += `\t\t\t\t${field.definition.value}\n`
      fields += `\t\t\t\t${field.definition.display}\n`
      fields += `\t\t\t}\n`
    }
  })
  let gql = `query ReadOne${table}($cuid: String!) {
  ${table}(cuid: $cuid) {
    ${fields}
  }
}`
console.log(gql)
  return gql
}
export const readManyGQL = ({ table, schema }) => {
  // build the graphql query for one row
  console.log({ table, schema })
  let fields = ''
  schema.fields.forEach((field) => {
    console.log({ field })
    if (!field.definition) {
      return
    }
    if (field.definition && !field.reference) {
      fields += `\t\t\t${field.name}\n`
    }
    if (field.definition && field.reference && field?.definition?.display && field?.definition?.value) {
      fields += `\t\t\t${field.reference.name} {\n`
      fields += `\t\t\t\t${field.definition.value}\n`
      fields += `\t\t\t\t${field.definition.display}\n`
      fields += `\t\t\t}\n`
    }
  })
  return `query ReadMany${table}($filter: String, $skip: Int, $take: Int, $q: String, $orderBy: OrderByInput) {
    ${table}(filter: $filter, skip: $skip, take: $take, q: $q, orderBy: $orderBy) {
      count
      take
      skip
      q
      results {
        cuid
        ${fields}
      }
    }
  }`
}
export const getRecord = async ({ query, cuid, token }) => {
  let response = await fetch('/.redwood/functions/graphql', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'auth-provider': 'dbAuth',
    },
    method: 'POST',
    body: JSON.stringify({
      query: query,
      variables: {
        cuid: cuid
      },
    }),
  })
  let data = await response.json()
  if (data.error) throw new Error(data.error)
  return data
}
export const getRecords = async ({ table, schema, token, variables }) => {
  if(!variables) variables = {
    take: 10,
    skip: 0,
    //filter: {},
  }
  let query = readManyGQL({ table, schema })
  let response = await fetch('/.redwood/functions/graphql', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'auth-provider': 'dbAuth',
    },
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
  })
  let data = await response.json()
  if (data.error) throw new Error(data.error)
  return data
}
export const tableNames = ({ table })=>{
  let camelTable = camelCase(table, { pascalCase: false })
  let pluralTable = pluralize(camelTable, 2)
  let singularTable = camelCase(pluralize(table, 1), { pascalCase: false })
  let pascalTable = camelCase(singularTable, { pascalCase: true })
  // lets split the table name into words, the pascal case is lllUlll
  let words = []
  let word = ''
  // split at the first capital letter
  for (let i = 0; i < pascalTable.length; i++) {
    if (pascalTable[i] == pascalTable[i].toUpperCase()) {
      if (word.length > 0) {
        words.push(word)
        word = ''
      }
    }
    word += pascalTable[i]
  }
  if (word.length > 0) {
    words.push(word)
  }
  let spacedTable = pluralize(words.join(' '),2)

  return { camelTable, pluralTable, singularTable, pascalTable, spacedTable }
}