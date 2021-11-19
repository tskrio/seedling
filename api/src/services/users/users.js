import { db } from 'src/lib/db'
import CryptoJS from 'crypto-js'

export const users = async () => {
  let records = await db.user.findMany({})
  return records
}

export const user = async ({ id }) => {
  let current = await db.user.findUnique({
    where: { id },
  })
  return current
}

export const updateUser = async ({ id, input }) => {
  let update = await db.user.update({
    data: input,
    where: { id },
  })
  return update
}

export const createUser = async ({ input }) => {
  let create = await db.user.create({
    data: input,
  })
  return create
}

export const deleteUser = async ({ id }) => {
  let deleteRecord = await db.user.delete({
    where: { id },
  })
  return deleteRecord
}

export const User = {
  GroupMember: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).GroupMember(),
  md5Email: (_args, { root }) => CryptoJS.MD5(root.email).toString(),
}
