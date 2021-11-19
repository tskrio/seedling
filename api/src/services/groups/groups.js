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
    let result = await executeBeforeCreateRules(table, {
      input,
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
    let createdRecord = await db[table].create({
      data: result.input,
    })
    createdRecord = executeAfterCreateRules(table, createdRecord)
    return createdRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const groups = async () => {
  try {
    let result = await executeBeforeReadAllRules(table, {
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
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
    let result = await executeBeforeReadRules(table, {
      id,
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
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
    let result = await executeBeforeUpdateRules(table, {
      id,
      input,
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
    let updatedRecord = await db[table].update({
      data: result.input,
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
    let result = await executeBeforeDeleteRules(table, {
      id,
      status: { code: 'success', message: '' },
    })
    if (result.status.code !== 'success') {
      throw new UserInputError(result.status.message)
    }
    let deletedRecord = await db[table].delete({
      where: { id },
    })
    deletedRecord = executeAfterDeleteRules(table, deletedRecord)
    return deletedRecord
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const Group = {
  GroupMember: (_obj, { root }) =>
    db[table].findUnique({ where: { id: root.id } }).GroupMember(),
}
