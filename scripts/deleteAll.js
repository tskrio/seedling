// To access your database
import { db } from '$api/src/lib/db'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args._[1])
  await db.user.deleteMany()
  await db.group.deleteMany({})
  await db.groupMember.deleteMany({})
  await db.groupRole.deleteMany({})
  await db.property.deleteMany({})
  await db.message.deleteMany({})
}
