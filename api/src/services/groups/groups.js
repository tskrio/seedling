import { UserInputError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'
import * as util from 'src/lib/rulesUtil'
import rules from 'src/rules/groups/**.{js,ts}'
let table = 'group'

export const groups = async () => {
  let records = await db.group.findMany({
    include: {
      GroupRole: true,
      GroupMember: true,
    },
  })
  let readRecords = records.map((current) => {
    util.runRules(table, current.id, null, rules, 'read', 'before')
    return current
  })
  records.forEach((current) => {
    util.runRules(table, current.id, null, rules, 'read', 'after')
    return current
  })
  return readRecords
}

export const group = async ({ id }) => {
  let current = await db.group.findUnique({
    where: { id },
    include: {
      GroupRole: true,
      GroupMember: true,
    },
  })
  util.runRules(table, id, null, rules, 'read', 'before')
  util.runRules(table, id, null, rules, 'read', 'after')
  return current
}

export const updateGroup = async ({ id, input }) => {
  var modifiedInput = await util.runRules(
    table,
    id,
    input,
    rules,
    'update',
    'before'
  )
  if (modifiedInput?._error) {
    throw new UserInputError(modifiedInput._error.message)
  }
  let update = await db.group.update({
    data: input,
    where: { id },
  })
  util.runRules(table, id, input, rules, 'update', 'after')
  return update
}

export const createGroup = async ({ input }) => {
  var modifiedInput = await util.runRules(
    table,
    null,
    input,
    rules,
    'create',
    'before'
  )
  if (modifiedInput?._error) {
    throw new UserInputError(modifiedInput._error.message)
  }
  let create = await db.group.create({
    data: input,
  })
  util.runRules(table, null, input, rules, 'create', 'after')
  return create
}

export const deleteGroup = async ({ id }) => {
  let output = await util.runRules(table, id, null, rules, 'delete', 'before')
  if (output?._error) {
    throw new UserInputError(output._error.message)
  }
  let deleteRecord = await db.group.delete({
    where: { id },
  })
  await util.runRules(table, id, null, rules, 'after', 'before')
  return deleteRecord
}

export const Group = {
  GroupMember: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).GroupMember(),
}
