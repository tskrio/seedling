//import { UserInputError } from '@redwoodjs/graphql-server'

//import { db } from 'src/lib/db'

import { deleteUser, updateUser, user } from '../users/users'

export const myProfile = async () => {
  return await user({ id: context.currentUser.id })
}
export const updateMyProfile = async ({ input }) => {
  return await updateUser({ id: context.currentUser.id, input })
}
export const deleteMyProfile = async () => {
  return await deleteUser({ id: context.currentUser.id })
}
