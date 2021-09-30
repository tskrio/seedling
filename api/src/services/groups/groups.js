import { db } from 'src/lib/db'
//import { requireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'
import * as util from 'src/lib/rulesUtil'
import rules from 'src/rules/groups/**.{js,ts}'

export const groups = async () => {
  let records = await db.group.findMany({
    include: {
      GroupRole: true,
      GroupMember: true,
    },
  })
  let beforeReadRulesArr = util.loadRules(rules, 'before', 'read')
  let readRecords = records.map((current) => {
    beforeReadRulesArr.forEach((rule) => {
      logger.info(`Starting Before Read Rule "${rule.title}" ${rule.order}`)
      rule.command(current, null)
      logger.info(`Ending Before Read Rule "${rule.title}"`)
    })
    return current
  })
  let afterReadRulesArr = util.loadRules(rules, 'after', 'read')
  records.forEach((current) => {
    afterReadRulesArr.forEach((rule) => {
      logger.info(`Starting After Read Rule "${rule.title}" ${rule.order}`)
      rule.command(current, null)
      logger.info(`Ending After Read Rule "${rule.title}"`)
    })
  })
  return readRecords
}

export const group = async ({ id }) => {
  let beforeReadRulesArr = util.loadRules(rules, 'before', 'read')
  let current = await db.group.findUnique({
    where: { id },
    include: {
      GroupRole: true,
      GroupMember: true,
    },
  })
  beforeReadRulesArr.forEach((rule) => {
    logger.info(`Starting Before Read Rule "${rule.title}" ${rule.order}`)
    rule.command(current, null)
    for (var prop in current) {
      logger.info(`  ${prop} "${current[prop]}"=>"${current[prop]}"`)
    }
    logger.info(`Ending Before Read Rule "${rule.title}"`)
  })
  let afterReadRulesArr = util.loadRules(rules, 'after', 'read')
  afterReadRulesArr.forEach((rule) => {
    logger.info(`Starting After Read Rule "${rule.title}" ${rule.order}`)
    rule.command(current, null)
    logger.info(`Ending After Read Rule "${rule.title}"`)
  })
  return current
}

export const createGroup = async ({ input }) => {
  let beforeCreateRulesArr = util.loadRules(rules, 'before', 'create')
  beforeCreateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Create Rule "${rule.title}" ${rule.order}`)
    rule.command(input, null)
    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }
    logger.info(`Ending Before Create Rule "${rule.title}"`)
  })
  let create = await db.group.create({
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

export const updateGroup = async ({ id, input }) => {
  let beforeUpdateRulesArr = util.loadRules(rules, 'before', 'update')
  let previous = await db.group.findUnique({
    where: { id },
  })
  beforeUpdateRulesArr.forEach((rule) => {
    logger.info(`Starting Before Update Rule "${rule.title}" ${rule.order}`)
    rule.command(input, previous)
    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }
    logger.info(`Ending Before Update Rule "${rule.title}"`)
  })
  let update = await db.group.update({
    data: input,
    where: { id },
  })

  let afterUpdateRulesArr = util.loadRules(rules, 'after', 'update')
  afterUpdateRulesArr.forEach((rule) => {
    logger.info(`Starting After Update Rule "${rule.title}" ${rule.order}`)
    rule.command(update, previous)
    logger.info(`Ending After Update Rule "${rule.title}"`)
  })
  return update
}

export const deleteGroup = async ({ id }) => {
  let beforeDeleteRulesArr = util.loadRules(rules, 'before', 'delete')
  let previous = await db.group.findUnique({
    where: { id },
  })
  beforeDeleteRulesArr.forEach((rule) => {
    logger.info(`Starting Before Delete Rule "${rule.title}" ${rule.order}`)
    rule.command(previous, null)
    logger.info(`Ending Before Delete Rule "${rule.title}"`)
  })
  let deleteRecord = await db.group.delete({
    where: { id },
  })

  let afterDeleteRulesArr = util.loadRules(rules, 'after', 'delete')
  afterDeleteRulesArr.forEach((rule) => {
    logger.info(`Starting After Delete Rule "${rule.title}" ${rule.order}`)
    rule.command(previous, null)
    logger.info(`Ending After Delete Rule "${rule.title}"`)
  })
  return deleteRecord
}

export const Group = {
  GroupMember: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).GroupMember(),
}
