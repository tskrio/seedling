import { db } from 'src/lib/db'
import { ForbiddenError } from '@redwoodjs/graphql-server'
export const groups = async () => {
  let records = await db.group.findMany({
    include: {
      GroupRole: true,
      GroupMember: true,
    },
  })
  return records
}

export const group = async ({ id }) => {
  let current = await db.group.findUnique({
    where: { id },
    include: {
      GroupRole: true,
      GroupMember: true,
    },
  })
  return current
}

export const updateGroup = async ({ id, input }) => {
  let update = await db.group.update({
    data: input,
    where: { id },
  })
  return update
}

export const createGroup = async ({ input }) => {
  try {
    console.log('BEFORE createGroup from service', input)

    let create = await db.group.create({
      data: input,
    })
    console.log('AFTER createGroup from service', create)
    return create
  } catch (e) {
    console.log(e)
    throw new ForbiddenError('Error')
  }
}

export const deleteGroup = async ({ id }) => {
  let deleteRecord = await db.group.delete({
    where: { id },
  })
  return deleteRecord
}

export const Group = {
  GroupMember: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).GroupMember(),
}
