import { db } from 'src/lib/db'

export const pages = () => {
  return db.page.findMany()
}

export const pageBySlug = ({ slug }) => {
  return db.page.findUnique({
    where: { slug },
  })
}