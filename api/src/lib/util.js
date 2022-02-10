import { db } from 'src/lib/db'
export const getProperty = async (entity) => {
  let record = await db.property.findFirst({
    where: { entity: entity },
  })
  if (!record) return false
  return record.value
}
export const log = async (message, source) => {
  console.log(context)
  if (typeof message === 'object') message = JSON.stringify(message)
  if (typeof source === 'undefined') {
    source = 'undefined'
  }
  await db.log.create({
    data: {
      message,
      source,
      context,
    },
  })
}
