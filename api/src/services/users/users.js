import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'
import * as util from 'src/lib/rulesUtil'
import rules from 'src/rules/users/**.{js,ts}'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  // create
  rules.add(() => requireAuth({ role: ['admin', 'userCreate'] }), {
    only: ['createUser'],
  })
  // read
  rules.add(() => requireAuth({ role: ['admin', 'userRead'] }), {
    only: ['users', 'user'],
  })
  // update
  rules.add(() => requireAuth({ role: ['admin', 'userUpdate'] }), {
    only: ['updateUser'],
  })
  // delete
  rules.add(() => requireAuth({ role: ['admin', 'userDelete'] }), {
    only: ['deleteUser'],
  })
}

export const users = () => {
  return db.user.findMany({
    //include: {
    //UserRole: true,
    //GroupMember: true,
    //},
  })
}

export const user = async ({ id }) => {
  let user = await db.user.findUnique({
    where: { id },
    include: {
      UserRole: true,
    },
  })
  console.log('user', user)
  return user
}

export const createUser = async ({ input }) => {
  let beforeCreateRulesArr = util.loadRules(rules, 'before', 'create')
  beforeCreateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Create Rule "${rule.title}" ${rule.order}`)
    rule.command(input, null)
    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }
    logger.info(`Ending Before Create Rule "${rule.title}"`)
  })
  let create = await db.user.create({
    data: input,
  })

  let afterCreateRulesArr = util.loadRules(rules, 'after', 'create')
  afterCreateRulesArr.forEach((rule) => {
    logger.info(`Starting After Create Rule "${rule.title}" ${rule.order}`)
    rule.command(create, null)
    logger.info(`Ending After Create Rule "${rule.title}"`)
  })
  return create
  /*return db.user.create({
    data: input,
  })*/
}

export const updateUser = async ({ id, input }) => {
  console.log('in upateuser function')
  let beforeCreateRulesArr = util.loadRules(rules, 'before', 'update')
  let previous = await db.user.findUnique({
    where: { id },
  })
  console.log('previous', previous)
  console.log('beforeCreateRulesArr', beforeCreateRulesArr)
  beforeCreateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Update Rule "${rule.title}" ${rule.order}`)
    rule.command(input, previous)
    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }
    logger.info(`Ending Before Update Rule "${rule.title}"`)
  })
  let update = await db.user.update({
    data: input,
    where: { id },
  })

  let afterCreateRulesArr = util.loadRules(rules, 'after', 'update')
  afterCreateRulesArr.forEach((rule) => {
    logger.info(`Starting After Update Rule "${rule.title}" ${rule.order}`)
    rule.command(update, previous)
    logger.info(`Ending After Update Rule "${rule.title}"`)
  })
  return update
  /*
  return await db.user.update({
    data: input,
    where: { id },
  })
  */
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  UserRole: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).UserRole(),
  GroupMember: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).GroupMember(),
}
