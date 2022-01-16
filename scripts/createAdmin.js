// To access your database
import { db } from '$api/src/lib/db'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args._[1])
  if (args._[1]) {
    await db.user.create({
      data: {
        name: args._[1] || 'Admin',
        email: args._[1] || 'admin',
        hashedPassword:
          '5f5f56d40b9ae6bf2abfd7804e97e607f9d7432feebb6371849f2676a5058999',
        salt: '881aed4f5703af38eaaab6e788d8e860',

        GroupMember: {
          create: {
            groupId: 1,
          },
        },
      },
    })
  }
}
