//import { UserInputError } from '@redwoodjs/graphql-server'

//import { db } from 'src/lib/db'

import { deleteUser, updateUser, user } from '../users/users'

export const myProfile = async () => {
  return await user({ cuid: context.currentUser.cuid })
}
export const updateMyProfile = async ({ input }) => {
  return await updateUser({ cuid: context.currentUser.cuid, input })
}
export const deleteMyProfile = async () => {
  return await deleteUser({ cuid: context.currentUser.cuid })
}
