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

async function main() {
  /***********************************/
  /* Prisma Middleware https://www.prisma.io/docs/concepts/components/prisma-client/middleware */
  /***********************************/

  db.$use(async (params, next) => {
    const result = await next(params)
    return result
  })
}
main()
