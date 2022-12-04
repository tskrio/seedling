import {
  AuthenticationError /*, ForbiddenError*/,
} from '@redwoodjs/graphql-server'

import { db } from '../db.js'
export const getUser = async (
  session /*, { token, type, event, context }*/
) => {
  // let debugObj = {
  //   session,
  //   token,
  //   type,
  //   event,
  //   context,
  // }
  //console.table(debugObj)
  //return debugObj
  try {
    // look up the user by the session id
    //let foundUser = await db.user.findUnique({
    let email = session?.['https://auth0.tskr.io/email']
    let name = session?.['https://auth0.tskr.io/name']
    let userData = await db.user.findUnique({
      //where: { id: session.id },//dbAuth
      where: { username: session.sub },
      select: {
        id: true,
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
            id: true,
            group: {
              select: {
                name: true,
                id: true,
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
    let roles = userData?.GroupMember.map((member) => {
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
      return { name: member?.group?.name, id: member?.group?.id }
    }) // look up the roles of the groups the user is a member of
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
    if (!userData) {
      // no user found... I guess make one.
      // is the user already has an account... with the email
      // e.g. they used google to auth once
      // then they logged in w/email for google
      // that would be two different auth0 accounts
      // in that case this will error and it doesn't look good
      // TODO: HANDLE THIS WEIRD ERROR
      try {
        userData = await db.user.create({
          data: {
            name: name,
            email: email,
            username: session?.sub,
          },
          select: { id: true, name: true },
        })
      } catch (error) {
        throw new AuthenticationError('There was a problem logging in.')
      }
    }

    let returnUser = {
      roles,
      groups,
      ...userData,
      preferences,
      messages,
    }
    return returnUser
  } catch (error) {
    return error
  }
}
