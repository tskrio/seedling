import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const taskNotes = () => {
  return db.taskNote.findMany()
}

export const TaskNote = {
  task: (_obj, { root }) =>
    db.taskNote.findUnique({ where: { id: root.id } }).task(),
  User: (_obj, { root }) =>
    db.taskNote.findUnique({ where: { id: root.id } }).User(),
}
