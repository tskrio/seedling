import { db } from 'src/lib/db'
import { UserInputError } from '@redwoodjs/graphql-server'
import {
  executeBeforeCreateRules,
  executeAfterCreateRules,
  executeBeforeReadAllRules,
  executeAfterReadAllRules,
  executeBeforeReadRules,
  executeAfterReadRules,
  executeBeforeUpdateRules,
  executeAfterUpdateRules,
  executeBeforeDeleteRules,
  executeAfterDeleteRules,
} from 'src/lib/rules'
import CryptoJS from 'crypto-js'
let table = 'user'
export const createUser = async ({ input }) => {
  try {
    executeBeforeCreateRules(table, input)
    let createdRecord = await db[table].create({
      data: input,
    })
    executeAfterCreateRules(table, createdRecord)
    return createdRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const users = async () => {
  try {
    executeBeforeReadAllRules(table)
    let readRecords = await db[table].findMany({})
    readRecords = executeAfterReadAllRules(table, readRecords)
    return readRecords
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const user = async ({ id }) => {
  try {
    executeBeforeReadRules(table, id)
    let readRecord = await db[table].findUnique({
      where: { id },
    })
    readRecord = executeAfterReadRules(table, readRecord)
    return readRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const updateUser = async ({ id, input }) => {
  try {
    executeBeforeUpdateRules(table, id, input)
    let updatedRecord = await db[table].update({
      data: input,
      where: { id },
    })
    updatedRecord = executeAfterUpdateRules(table, updatedRecord)
    return updatedRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const deleteUser = async ({ id }) => {
  try {
    executeBeforeDeleteRules(table, id)
    let deletedRecord = await db[table].delete({
      where: { id },
    })
    deletedRecord = executeAfterDeleteRules(table, deletedRecord)
    return deletedRecord
  } catch (error) {
    throw UserInputError(error.message)
  }
}

export const User = {
  GroupMember: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).GroupMember(),
  md5Email: (_args, { root }) => CryptoJS.MD5(root.email).toString(),
}
