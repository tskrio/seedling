import { UserInputError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'
import * as util from 'src/lib/rulesUtil'
import rules from 'src/rules/users/**.{js,ts}'
let table = 'user'

export const groupRoles = async () => {
  let records = await db.groupRole.findMany({})

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

export const groupRole = async ({ id }) => {
  util.runRules(table, id, null, rules, 'read', 'before')
  let current = await db.groupRole.findUnique({
    where: { id },
  })
  util.runRules(table, id, null, rules, 'read', 'after')
  return current
}

export const updateGroupRole = async ({ id, input }) => {
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
  let update = await db.groupRole.update({
    data: modifiedInput,
    where: { id },
  })
  util.runRules(table, id, input, rules, 'update', 'after')
  return update
}

export const createGroupRole = async ({ input }) => {
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
  let create = await db.groupRole.create({
    data: modifiedInput,
  })
  util.runRules(table, null, input, rules, 'create', 'after')
  return create
}

export const deleteGroupRole = async ({ id }) => {
  let output = await util.runRules(table, id, null, rules, 'delete', 'before')
  if (output?._error) {
    throw new UserInputError(output._error.message)
  }
  let deleteRecord = await db.groupRole.delete({
    where: { id },
  })
  await util.runRules(table, id, null, rules, 'after', 'before')
  return deleteRecord
}

export const groupRolesByGroup = (id) => {
  return db.groupRole.findMany({
    where: { group: id },
  })
}

export const GroupRole = {
  group: (_obj, { root }) =>
    db.groupRole.findUnique({ where: { id: root.id } }).group(),
}
