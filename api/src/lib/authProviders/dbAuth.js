import { db } from '../db.js'
//import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'
export const getUser = async (session) => {
  try {
    // look up the user by the session id
    console.log({ function: 'dbauth.js', session })
    let userData = await db.user.findUnique({
      where: { cuid: session.id },
      select: {
        cuid: true,
        name: true,
        email: true,
        Preference: {
          select: {
            entity: true,
          },
        },
        GroupMember: {
          select: {
            createdAt: true,
            cuid: true,
            group: {
              select: {
                name: true,
                cuid: true,
                GroupRole: {
                  select: {
                    role: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    // look up the group memberships of the user's groups, and roles
    let roles = userData?.GroupMember.map((member) => {
      //console.log({ function: 'dbAuth.js roles', member })
      if (member?.group?.GroupRole) {
        return [...member.group.GroupRole].map((role) => {
          return role.role
        })
      } else {
        return []
      }
    })
      .join(',')
      .split(',')
    let groups = userData?.GroupMember.map((member) => {
      return { name: member?.group?.name, cuid: member?.group?.id }
    }) // look up the roles of the groups the user is a member of
    let foundPreferences = await db.preference.findMany({
      where: { userCuid: session.id },
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
      groups,
      ...userData,
      preferences,
      messages,
    }
    //console.log({ function: 'dbAuth.js getUser', returnUser })
    return returnUser
  } catch (error) {
    return error
  }
}
