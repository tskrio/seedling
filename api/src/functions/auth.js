import { db } from 'src/lib/db'
import { DbAuthHandler } from '@redwoodjs/api'

export const handler = async (event, context) => {
  try {
    console.log('in auth.js')
    console.log(event)
    console.log(context)
    const authHandler = new DbAuthHandler(event, context, {
      // Provide prisma db client
      db: db,
      authModelAccessor: 'user',
      authFields: {
        id: 'id',
        username: 'email',
        hashedPassword: 'hashedPassword',
        salt: 'salt',
      },
      signupHandler: ({ username, hashedPassword, salt, userAttributes }) => {
        if (!username.match(/.+?@.+?\..+?/)) {
          throw new Error('Not a valid email address!')
        }
        return db.user.create({
          data: {
            email: username,
            hashedPassword: hashedPassword,
            salt: salt,
            name: userAttributes.name,
          },
        })
      },
      loginExpires: 60 * 60 * 24 * 365 * 10,
      loginHandler: (user) => {
        return user
      },
    })

    return authHandler.invoke()
  } catch (e) {
    console.error(e)
  }
}
