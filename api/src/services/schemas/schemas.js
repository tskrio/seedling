import { PrismaClient } from '@prisma/client'
import { definitions as listDefinitions } from 'src/lib/listFieldDefinitions'
import { definitions as formDefinitions } from 'src/lib/formFieldDefinitions'
import { camelCase } from 'camel-case'
import { singularize } from 'src/lib/libPluralize'
export const schema = async ({ table, type }) => {
  const prisma = new PrismaClient()
  let dmmf = await prisma._getDmmf()
  let models = dmmf.datamodel.models
  let singularTable = singularize(table)
  //console.log('models', models)
  // first we need to filter the schema to only include the table
  let filteredModels = models.filter((item) => {
    let camelCaseSingular = camelCase(singularize(item.name), { pascalCase: false })
    return camelCaseSingular === singularTable
  })
  let fields = filteredModels[0].fields
  let mergedFields = fields.map((field) => {
    let definition = (type === 'form') ? formDefinitions : listDefinitions
    let fieldsFromDefinition = definition?.[singularTable]
    let fieldFromDefinition = fieldsFromDefinition?.filter((item) => item.name === field.name)[0]
    if(field && fieldFromDefinition) {
      if(field.default){
        //stringify the default value
        field.default = JSON.stringify(field.default)
      }
      let mergedField = {
        ...field,
        definition: fieldFromDefinition
      }
      return mergedField
    }
  })
  // remove any undefined fields
  mergedFields = mergedFields.filter((item) => item)
  // sort the fields by the order property, some feilds may not have an order property
  // in that case add it as a attribute order incrementing by 1 by name
  mergedFields = mergedFields.map((item, index) => {
    if (!item.definition.order) {
      item.definition.order = index * 1
    }
    return item
  })

  mergedFields = mergedFields.sort((a, b) => {
    if (a.definition.order && b.definition.order) {
      return a.definition.order - b.definition.order
    } else if (a.definition.order && !b.definition.order) {
      return -1
    } else if (!a.definition.order && b.definition.order) {
      return 1
    } else {
      return 0
    }
  })
  try {
    return {
      table: singularTable,
      results: mergedFields
    }
  } catch (error) {
    console.log(error)
  }
}
