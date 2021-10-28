import { UserInputError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'
import * as util from 'src/lib/rulesUtil'
import rules from 'src/rules/groupMembers/**.{js,ts}'
let table = 'user'

export const groupMembers = async () => {
  let records = await db.groupMember.findMany({})

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

export const groupMember = async ({ id }) => {
  util.runRules(table, id, null, rules, 'read', 'before')
  let current = await db.groupMember.findUnique({
    where: { id },
  })
  util.runRules(table, id, null, rules, 'read', 'after')
  return current
}

export const updateGroupMember = async ({ id, input }) => {
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
  let update = await db.groupMember.update({
    data: modifiedInput,
    where: { id },
  })
  util.runRules(table, id, input, rules, 'update', 'after')
  return update
}

export const createGroupMember = async ({ input }) => {
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
  let create = await db.groupMember.create({
    data: modifiedInput,
  })
  util.runRules(table, null, input, rules, 'create', 'after')
  return create
}
export const deleteGroupMember = async ({ id }) => {
  let output = await util.runRules(table, id, null, rules, 'delete', 'before')
  if (output?._error) {
    throw new UserInputError(output._error.message)
  }
  let deleteRecord = await db.groupMember.delete({
    where: { id },
  })
  await util.runRules(table, id, null, rules, 'after', 'before')
  return deleteRecord
}

export const groupMembersByGroup = async (id) => {
  let records = await db.groupMember.findMany({
    where: { group: id },
  })
  let readRecords = records.map((current) => {
    return current
  })
  return readRecords
}

export const groupMembersByUser = async (id) => {
  let records = await db.groupMember.findMany({
    where: { user: id },
  })
  let readRecords = records.map((current) => {
    return current
  })
  return readRecords
}

export const GroupMember = {
  user: (_obj, { root }) =>
    db.groupMember.findUnique({ where: { id: root.id } }).user(),
  group: (_obj, { root }) =>
    db.groupMember.findUnique({ where: { id: root.id } }).group(),
}
