import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'
import * as rulesUtil from 'src/lib/rulesUtil'
import rules from 'src/rules/users/**.{js,ts}'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const users = () => {
  return db.user.findMany()
}

export const user = async ({ id }) => {
  let result = await db.user.findUnique({
    where: { id },
  })
  return result
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = async ({ id, input }) => {
  let previous = await db.user.findUnique({
    where: { id },
    //    include: {
    //      GroupMember: true
    //    }
  })
  let beforeUpdateRulesArr = rulesUtil.loadRules(rules, 'before', 'update')
  beforeUpdateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Update Rule "${rule.title}" ${rule.order}`)
    rule.command(input, previous)
    if (previous !== input) {
      for (var prop in input) {
        if (previous[prop] !== input[prop]) {
          logger.info(`  ${prop} "${previous[prop]}"=>"${input[prop]}"`)
        }
      }
    }
    logger.info(`Ending   Before Update Rule "${rule.title}"`)
  })
  let update = await db.user.update({
    data: input,
    where: { id },
    include: {
      GroupMember: true,
    },
  })

  //return db.user.update({
  //  data: input,
  //  where: { id },
  //})
  let afterUpdateRulesArr = rulesUtil.loadRules(rules, 'after', 'update')
  afterUpdateRulesArr.forEach((rule) => {
    logger.info(`Starting After Update Rule "${rule.title}" ${rule.order}`)
    rule.command(update, previous)
    logger.info(`Ending   After Update Rule "${rule.title}"`)
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}
