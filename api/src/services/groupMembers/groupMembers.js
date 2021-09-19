import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'
import * as util from 'src/lib/rulesUtil'
import rules from 'src/rules/groupMembers/**.{js,ts}'
// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  // create
  rules.add(() => requireAuth({ role: ['admin', 'groupMemberCreate'] }), {
    only: ['createGroupMember'],
  })
  // read
  rules.add(() => requireAuth({ role: ['admin', 'groupMemberRead'] }), {
    only: ['groupMembers', 'groupMembersByGroup', 'groupMember'],
  })
  // update
  rules.add(() => requireAuth({ role: ['admin', 'groupMemberUpdate'] }), {
    only: ['updateGroupMember'],
  })
  // delete
  rules.add(() => requireAuth({ role: ['admin', 'groupMemberDelete'] }), {
    only: ['deleteGroupMember'],
  })
}

export const groupMembers = () => {
  return db.groupMember.findMany({
    /*include: {
      GroupRole: true
    }*/
  })
}

export const groupMembersByGroup = (id) => {
  console.log('groupMembersByGroup', id)
  return db.groupMember.findMany({
    where: { group: id },
  })
}

export const groupMember = ({ id }) => {
  return db.groupMember.findUnique({
    where: { id },
  })
}

export const createGroupMember = async ({ input }) => {
  let beforeCreateRulesArr = util.loadRules(rules, 'before', 'create')
  beforeCreateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Create Rule "${rule.title}" ${rule.order}`)
    rule.command(input, null)
    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }
    logger.info(`Ending Before Create Rule "${rule.title}"`)
  })
  let create = await db.groupMember.create({
    data: input,
  })

  let afterCreateRulesArr = util.loadRules(rules, 'after', 'create')
  afterCreateRulesArr.forEach((rule) => {
    logger.info(`Starting After Create Rule "${rule.title}" ${rule.order}`)
    rule.command(create, null)
    logger.info(`Ending After Create Rule "${rule.title}"`)
  })
  return create
}

export const updateGroupMember = ({ id, input }) => {
  return db.groupMember.update({
    data: input,
    where: { id },
  })
}

export const deleteGroupMember = ({ id }) => {
  return db.groupMember.delete({
    where: { id },
  })
}

export const GroupMember = {
  user: (_obj, { root }) =>
    db.groupMember.findUnique({ where: { id: root.id } }).user(),
  group: (_obj, { root }) =>
    db.groupMember.findUnique({ where: { id: root.id } }).group(),
}
