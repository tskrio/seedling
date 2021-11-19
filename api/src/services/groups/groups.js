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
let table = 'group'

export const createGroup = async ({ input }) => {
  try {
    input = await executeBeforeCreateRules(table, input)
    console.log(input)
    if (input._error) {
      throw input._error
    }
    let createdRecord = await db[table].create({
      data: input,
    })
    createdRecord = executeAfterCreateRules(table, createdRecord)
    return createdRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const groups = async () => {
  try {
    executeBeforeReadAllRules(table)
    let readRecords = await db[table].findMany({
      include: {
        GroupRole: true,
        GroupMember: true,
      },
    })
    readRecords = executeAfterReadAllRules(table, readRecords)
    return readRecords
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const group = async ({ id }) => {
  try {
    executeBeforeReadRules(table, id)
    let readRecord = await db[table].findUnique({
      where: { id },
      include: {
        GroupRole: true,
        GroupMember: true,
      },
    })
    readRecord = executeAfterReadRules(table, readRecord)
    return readRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const updateGroup = async ({ id, input }) => {
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

export const deleteGroup = async ({ id }) => {
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

export const Group = {
  GroupMember: (_obj, { root }) =>
    db[table].findUnique({ where: { id: root.id } }).GroupMember(),
}
