import { db } from 'src/lib/db'

export const preferences = () => {
  return db.preference.findMany()
}

export const preference = ({ id }) => {
  return db.preference.findUnique({
    where: { id },
  })
}

export const Preference = {
  user: (_obj, { root }) =>
    db.preference.findUnique({ where: { id: root.id } }).user(),
}
