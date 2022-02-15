import { db } from 'src/lib/db'
export const getProperty = async (entity) => {
  let record = await db.property.findFirst({
    where: { entity: entity },
  })
  if (!record) return false
  return record.value
}
export const log = async (message, source) => {
  if (typeof message === 'object') message = JSON.stringify(message)
  if (typeof source === 'undefined') {
    source = 'undefined'
  }
  let safeContext = { ...context }
  delete safeContext.request.headers.cookie // removed to remove password data
  delete safeContext.document // removed to remove password data
  delete safeContext.event // removed to remove password data
  delete safeContext.operation // removed as its not needed
  await db.log.create({
    data: {
      message,
      source,
      context: safeContext,
    },
  })
}
