import { db } from 'src/lib/db'

export const formDefinitions = () => {
  return db.formDefinition.findMany()
}

export const formDefinition = ({ cuid }) => {
  return db.formDefinition.findUnique({
    where: { cuid },
  })
}

export const formDefinitionByTable = ({ table }) => {
  return db.formDefinition.findUnique({
    where: { table },
  })
}

export const createFormDefinition = ({ input }) => {
  return db.formDefinition.create({
    data: input,
  })
}

export const updateFormDefinition = ({ cuid, input }) => {
  return db.formDefinition.update({
    data: input,
    where: { cuid },
  })
}

export const deleteFormDefinition = ({ cuid }) => {
  return db.formDefinition.delete({
    where: { cuid },
  })
}
