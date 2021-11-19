// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'
import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'
import { logger } from './logger'
import middlewares from 'src/middlewares/**/**.{js,ts}'
/*
 * Instance of the Prisma Client
 */

export const db = new PrismaClient({
  log: emitLogLevels(['info', 'warn', 'error']),
})

handlePrismaLogging({
  db,
  logger,
  logLevels: ['info', 'warn', 'error'],
})

let middlewaresArr = Object.keys(middlewares).map((k) => middlewares[k]) //from obj to arr of objects
middlewaresArr.sort((a, b) => a.order - b.order) //order rules asc
middlewaresArr = middlewaresArr.filter((rule) => {
  return rule.active === true
})
let modelQueries = [
  { group: 'create', queries: ['create', 'createMany', 'upsert'] },
  { group: 'read', queries: ['findUnique', 'findFirst', 'findMany'] },
  { group: 'update', queries: ['update', 'updateMany', 'upsert'] },
  { group: 'delete', queries: ['delete', 'deleteMany'] },
  { group: 'other', queries: ['count', 'aggregate', 'groupBy'] },
]
// let green = (str) => {
//   return `\u001b[1;32m${str}\u001b[0m`
// }

async function main() {
  /***********************************/
  /* Prisma Middleware               */
  /* https://www.prisma.io/docs/concepts/components/prisma-client/middleware */
  /***********************************/

  console.log('context', context)
  /*
  db.$use(async (params, next) => {
    //const before = Date.now()
    modelQueries.forEach((modelQuery) => {
      //loop over the create, read, update, delete, other groupings
      modelQuery.queries.forEach((query) => {
        //loop over the FindUnique, insert, update, delete methods in those groupings
        if (params.action === query) {
          // logger.info(
          //   `MW BEFORE: ${green(params.model)} ${modelQuery.group} ${green(
          //     params.action
          //   )}`
          // )
          middlewaresArr.forEach(async (middleware) => {
            if (middleware.type.includes(modelQuery.group)) {
              //if the rule type (array) includes the grouping (crud)
              // console.log(
              //   `${green('Started ')} Order: ${rule.order} rule ${rule.name}`,
              //   JSON.stringify(params, null, 2)
              // )
              params = await middleware.command(params)

              // console.log(
              //   `${green('Finished')} Order: ${rule.order} rule ${rule.name}`,
              //   JSON.stringify(params, null, 2)
              // )
            }
          })
        }
      })
    })
    console.log('before params', JSON.stringify(params, '', ''))
    const result = await next(params)
    console.log('_after params', JSON.stringify(params, '', ''))

    // const after = Date.now()
    // console.log(
    //  `Query ${params.model}.${params.action} took ${after - before}ms`
    // )
    // console.log('MIDDLEWARE AFTER params.args', params.args)
    return result
  })
  */
}

main()
