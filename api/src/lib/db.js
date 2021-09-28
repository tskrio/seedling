// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

import rules from 'src/rules/**/**.{js,ts}'
console.log('rules.length', rules.length)
console.log('rules', rules)

import rules2 from 'src/middlewares/**/**.{js,ts}'
console.log('rules2.length', rules2.length)
console.log('rules2', rules2)
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
//console.log(modelQueries)
async function main() {
  /***********************************/
  /* MIDDLEWARE */
  /***********************************/
  //console.log(rules)

  db.$use(async (params, next) => {
    console.log('params', params)
    const before = Date.now()
    modelQueries.forEach((modelQuery) => {
      modelQuery.queries.forEach((query) => {
        if (params.action === query) {
          logger.info(
            `MW BEFORE: ${green(params.model)} ${modelQuery.group} ${green(
              params.action
            )}`
          )
          console.log('MIDDLEWARE BEFORE params.args', params.args)
          //if (params.args?.data?.name) {
          //params.args.data.name = 'This is your name'
          /*rules.forEach((rule) => {
              if (rule.type.includes(modelQuery.group)) {
                logger.info(`MW RULE: ${rule.file}`)
                params = rule.command(params.args?.data)
              }
            })*/
          //}
        }
      })
    })
    const result = await next(params)
    const after = Date.now()
    console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    )
    console.log('MIDDLEWARE AFTER params.args', params.args)
    return result
  })
}
main()
