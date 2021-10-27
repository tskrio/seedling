import { UserInputError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'
import * as util from 'src/lib/rulesUtil'
import rules from 'src/rules/users/**.{js,ts}'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1

export const users = async () => {
  let records = await db.user.findMany({})

  let readRecords = records.map((current) => {
    util.runRules('user', current.id, null, rules, 'read', 'before');
    return current
  })

  records.forEach((current) => {
    util.runRules('user', current.id, null, rules, 'read', 'after');
    return current
  })

  return readRecords
}

export const user = async ({ id }) => {
  let current = await db.user.findUnique({
    where: { id },
  })
  util.runRules('user', id, null, rules, 'read', 'before');
  util.runRules('user', id, null, rules, 'read', 'after');
  return current
}

export const updateUser = async ({ id, input }) => {
  //var modifiedInput = await util.runBeforeRules(id, input, rules, 'user');
  var modifiedInput = await util.runRules('user', id, input, rules, 'update', 'before');
  console.log('input ', modifiedInput);
  if (modifiedInput?._error) {
    throw new UserInputError(modifiedInput._error.message);
  }
  let update = await db.user.update({
    data: modifiedInput,
    where: { id },
  })

  util.runRules('user', id, input, rules, 'update', 'after');
  return update
}

export const deleteUser = async ({ id }) => {
  await util.runRules('user', id, null, rules, 'delete', 'before');
  //await util.runBeforeRules(input, rules, 'user', record);
  if (modifiedInput?._error) {
    throw new UserInputError(input._error.message);
  }

  let deleteRecord = await db.user.delete({
    where: { id },
  })

  await util.runRules('user', id, null, rules, 'after', 'before');
  return deleteRecord
}

export const User = {
  GroupMember: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).GroupMember(),
}
