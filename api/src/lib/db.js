// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'
import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'
import { logger } from './logger'
import rules from 'src/middlewares/**/**.{js,ts}'
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

let rulesArr = Object.keys(rules).map((k) => rules[k]) //from obj to arr of objs
rulesArr.sort((a, b) => a.order - b.order) //order rules asc
rulesArr = rulesArr.filter((rule) => {
  return rule.active === true
})
let modelQueries = [
  { group: 'create', queries: ['create', 'createMany', 'upsert'] },
  { group: 'read', queries: ['findUnique', 'findFirst', 'findMany'] },
  { group: 'update', queries: ['update', 'updateMany', 'upsert'] },
  { group: 'delete', queries: ['delete', 'deleteMany'] },
  { group: 'other', queries: ['count', 'aggregate', 'groupBy'] },
]
let green = (str) => {
  return `\u001b[1;32m${str}\u001b[0m`
}
async function main() {
  /***********************************/
  /* MIDDLEWARE */
  /***********************************/
  console.log('context', context)

  db.$use(async (params, next) => {
    const before = Date.now()
    modelQueries.forEach((modelQuery) => {
      //loop over the create, read, update, delete, other groupings
      modelQuery.queries.forEach((query) => {
        //loop over the FindUnique, insert, update, delete methods in those groupings
        if (params.action === query) {
          /*logger.info(
            `MW BEFORE: ${green(params.model)} ${modelQuery.group} ${green(
              params.action
            )}`
          )*/
          rulesArr.forEach(async (rule) => {
            if (rule.type.includes(modelQuery.group)) {
              //if the rule type (array) includes the grouping (crud)
              /*console.log(
                `${green('Started ')} Order: ${rule.order} rule ${rule.name}`,
                JSON.stringify(params, null, 2)
              )*/
              params = await rule.command(params)
              /*console.log(
                `${green('Finished')} Order: ${rule.order} rule ${rule.name}`,
                JSON.stringify(params, null, 2)
              )*/
            }
          })
        }
      })
    })
    const result = await next(params)
    const after = Date.now()
    /*console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    )*/
    //console.log('MIDDLEWARE AFTER params.args', params.args)
    return result
  })
}
main()
