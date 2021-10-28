import { UserInputError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'
import * as util from 'src/lib/rulesUtil'
import rules from 'src/rules/users/**.{js,ts}'
let table = 'user'

export const users = async () => {
  let records = await db.user.findMany({})

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

export const user = async ({ id }) => {
  util.runRules(table, id, null, rules, 'read', 'before')
  let current = await db.user.findUnique({
    where: { id },
  })
  util.runRules(table, id, null, rules, 'read', 'after')
  return current
}

export const updateUser = async ({ id, input }) => {
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
  let update = await db.user.update({
    data: modifiedInput,
    where: { id },
  })
  util.runRules(table, id, input, rules, 'update', 'after')
  return update
}

export const createUser = async ({ input }) => {
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
  let create = await db.user.create({
    data: modifiedInput,
  })
  util.runRules(table, null, input, rules, 'create', 'after')
  return create
}

export const deleteUser = async ({ id }) => {
  let output = await util.runRules(table, id, null, rules, 'delete', 'before')
  if (output?._error) {
    throw new UserInputError(output._error.message)
  }
  let deleteRecord = await db.user.delete({
    where: { id },
  })
  await util.runRules(table, id, null, rules, 'after', 'before')
  return deleteRecord
}

export const User = {
  GroupMember: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).GroupMember(),
}
