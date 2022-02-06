import { db } from '../db.js'
//import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'
export const getUser = async (session) => {
  try {
    // look up the user by the session id
    let foundUser = await db.user.findUnique({
      where: { id: session.id },
      select: { id: true, name: true },
    })
    // look up the group memberships of the user
    let foundGroups = await db.groupMember.findMany({
      where: { userId: session.id },
      include: {
        group: {
          include: { GroupRole: true },
        },
      },
    })
    console.log('stringifyied', JSON.stringify(foundGroups))
    //TODO TEST THIS: //let roles = foundGroups.map((membership)=>{return [...membership?.group?.GroupRole].map((role)=>{return role.role})})
    //TODO TEST GIVING GROUPS TO CONTEXT//let groups = foundGroups.map((membership)=>{return [...membership?.group?.GroupRole].map((role)=>{return role.role})})
    // look up the roles of the groups the user is a member of
    let foundGroupRoles = await db.groupRole.findMany({
      where: {
        groupId: { in: foundGroups.map((group) => group.groupId) },
      },
    })
    // assign the roles to the user
    let roles = foundGroupRoles.map((groupRole) => groupRole.role)
    // get user's preferences and store them as part of the user
    let foundPreferences = await db.preference.findMany({
      where: { userId: session.id },
    })
    let preferences = {}
    foundPreferences.forEach((preference) => {
      preferences[preference.entity] = preference.value
    })
    if (!preferences.language) {
      preferences.language = 'en'
    }
    let foundMessages = await db.message.findMany({
      where: { language: preferences.language },
    })
    let messages = {}
    foundMessages.forEach((message) => {
      messages[message.entity] = message.value
    })
    let returnUser = {
      roles,
      ...foundUser,
      preferences,
      messages,
      foundGroups,
    }
    return returnUser
  } catch (error) {
    return error
  }
}
