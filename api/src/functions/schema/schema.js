import { PrismaClient } from '@prisma/client'

import { definitions as listDefinitions } from 'src/lib/listFieldDefinitions'
import { definitions as formDefinitions } from 'src/lib/formFieldDefinitions'
import { logger } from 'src/lib/logger'
import { camelCase } from 'camel-case'
import { pluralize, singularize } from 'src/lib/libPluralize'
/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event /*, context*/) => {
  logger.info('Invoked schema function')
  // get the url parameters
  let table = event.queryStringParameters.table
  // get the query parameter "form" and make a variable
  let form = event.queryStringParameters.form
  // get the post body
  let definitions = (form) ? formDefinitions : listDefinitions
  let body = JSON.parse(event.body)
  if (!table) {
    table = body?.table
  }
  if (!table) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'No table specified',
      }),
    }
  }
  let camelTable = camelCase(table, { pascalCase: false })
  let pluralTable = pluralize(table)
  let singularTable = singularize(table)

  const prisma = new PrismaClient()
  let dmmf = await prisma._getDmmf()
  let models = dmmf.datamodel.models

  if (table) {
    // filter the schema to only include the table
    // data.schema is an array of objects with a name property
    //console.log({ models })
    models = models.filter((item) => {
      return item.name === table
    })
    if (models.length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Table not found',
        }),
      }
    }

    if (models.length > 0) {
      // now filter out the fields we don't want to show
      models = models[0]
    }

    // now we need to include sub tables
    // we need to loop through the fields and see if any of them are lists
    // if they are, we need to add them to the schema
    models.fields.forEach((field) => {
      // if the type is not a string, integer or boolean, it's a relation
      console.log({ field: field.name, type: field.type })
      if (
        field.type !== 'String' &&
        field.type !== 'Int' &&
        field.type !== 'Boolean' &&
        field.type !== 'DateTime'
      ) {
        console.log({ field })
        dmmf.datamodel.models.forEach((model) => {
          if (model.name === field.type) {
            // only include the fields from the definition
            model.fields = model.fields.filter((item) => {
              return definitions?.[camelTable]?.[field.name]?.fields?.includes(item.name)
            })
            field.reference = model
          }
        })
      }
      // append the definition to the field
      field.definition = {
        ...definitions?.[camelTable]?.[field.name]
      }
    })
  }
  // filter out the fields we don't want to show
  models.fields = models.fields.filter((item) => {
    return !definitions?.global?.includes(item.name)
  })
  // filter out the fields we don't want to show
  models.fields = models.fields.filter((item) => {
    return definitions?.[camelTable]?.[item.name]
  })
  // filter out fields where 'isList' is true
  models.fields = models.fields.filter((item) => {
    return !item.isList
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      definitions,
      schema: models,
    }),
  }
}
