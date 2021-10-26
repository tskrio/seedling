import { UserInputError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'
import * as util from 'src/lib/rulesUtil'
import rules from 'src/rules/users/**.{js,ts}'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1

export const users = async () => {
  await util.runBeforeRules(rules, 'before', 'read')
  if (input?._error) {
    throw new UserInputError(input._error.message);
  }
  let readRecords = await db.user.findMany({})

  util.runAfterRules(id, input, rules);
  return readRecords
}

export const user = async ({ id }) => {
  await util.runBeforeRules(rules, 'before', 'read')
  if (input?._error) {
    throw new UserInputError(input._error.message);
  }
  let current = await db.user.findUnique({
    where: { id },
  })
  util.runAfterRules(id, input, rules);
  return current
}

export const createUser = async ({ input }) => {
  await util.runBeforeRules(id, input, rules, 'user');
  if (input?._error) {
    throw new UserInputError(input._error.message);
  }

  let create = await db.user.create({
    data: input,
  })

  util.runAfterRules(id, input, rules);
  return create
  /*return db.user.create({
    data: input,
  })*/
}

export const updateUser = async ({ id, input }) => {
  await util.runBeforeRules(id, input, rules, 'user');
  console.log('input ', input);
  if (input?._error) {
    throw new UserInputError(input._error.message);
  }
  let update = await db.user.update({
    data: input,
    where: { id },
  })

  util.runAfterRules(id, input, rules);
  return update
}

export const deleteUser = async ({ id }) => {
  let previous = await db.user.findUnique({
    where: { id },
  })
  await util.runBeforeRules(id, input, rules, 'user');
  if (input?._error) {
    throw new UserInputError(input._error.message);
  }

  let deleteRecord = await db.user.delete({
    where: { id },
  })

  util.runAfterRules(id, input, rules);
  return deleteRecord
}

export const User = {
  GroupMember: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).GroupMember(),
}
