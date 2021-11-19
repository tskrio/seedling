import { logger } from 'src/lib/logger'
import allRules from 'src/rules/**/**.{js,ts}'
//console.log(allRules)
let loadRules = (allRules, table, when, operation) => {
  let arrRules = Object.keys(allRules).map((k) => allRules[k])
  arrRules.sort((a, b) => a.order - b.order)
  console.log(`1. loaded ${arrRules.length} for ${table} ${when} ${operation}`)
  arrRules = arrRules.filter((rule) => {
    let requiredFields = [
      'title',
      'order',
      'when',
      'operation',
      'command',
      'active',
      'file',
    ]
    var errors = false
    requiredFields.forEach((field) => {
      if (!rule[field]) {
        logger.error(
          `${field} is required for rule ${rule?.title || rule?.file}`
        )
        errors = true
      }
    })
    if (!errors) {
      return rule.active === true
    } else {
      return false
    }
  })
  console.log(`2. loaded ${arrRules.length} for ${table} ${when} ${operation}`)

  //console.log('in rules.js before includes', arrRules)
  arrRules = arrRules.filter((rule) => {
    if (
      rule.table === table &&
      rule.when.includes(when) &&
      rule.operation.includes(operation)
    ) {
      return true
    } else {
      return false
    }
  })
  console.log(`3. loaded ${arrRules.length} for ${table} ${when} ${operation}`)
}
export const executeBeforeCreateRules = async (table, input) => {
  let rules = await loadRules(allRules, table, 'before', 'create')
  if (rules) {
    console.log(rules)
    rules.forEach(async (rule) => {
      await rule.command(input)
    })
  }
  return await input
}
export const executeAfterCreateRules = async (table, record) => {
  let rules = loadRules(allRules, table, 'after', 'create')
  if (rules) {
    rules.forEach((rule) => {
      record = rule.command(record)
    })
  }
  return await record
}
export const executeBeforeReadAllRules = async (table) => {
  //console.log('in executeBeforeReadAllRules')
  let rules = loadRules(allRules, table, 'before', 'readall')
  //console.log(rules)
  if (rules) {
    rules.forEach((rule) => {
      rule.command()
    })
  }
  return await null
}
export const executeAfterReadAllRules = async (table, records) => {
  let rules = loadRules(allRules, table, 'after', 'readall')
  if (rules) {
    rules.forEach((rule) => {
      records = rule.command(records)
    })
  }
  return await records
}
export const executeBeforeReadRules = async (table, id) => {
  let rules = loadRules(allRules, table, 'before', 'read')
  if (rules) {
    rules.forEach((rule) => {
      id = rule.command(id)
    })
  }
  return await id
}
export const executeAfterReadRules = async (table, record) => {
  let rules = loadRules(allRules, table, 'after', 'read')
  if (rules) {
    rules.forEach((rule) => {
      record = rule.command(record)
    })
  }
  return await record
}
export const executeBeforeUpdateRules = async (table, input) => {
  let rules = loadRules(allRules, table, 'before', 'update')
  if (rules) {
    rules.forEach((rule) => {
      input = rule.command(input)
    })
  }
  return await input
}
export const executeAfterUpdateRules = async (table, record) => {
  let rules = loadRules(allRules, table, 'after', 'update')
  if (rules) {
    rules.forEach((rule) => {
      record = rule.command(record)
    })
  }
  return await record
}
export const executeBeforeDeleteRules = async (table, id) => {
  let rules = loadRules(allRules, table, 'before', 'delete')
  if (rules) {
    rules.forEach((rule) => {
      id = rule.command(id)
    })
  }
  return await id
}
export const executeAfterDeleteRules = async (table, record) => {
  let rules = loadRules(allRules, table, 'after', 'delete')
  if (rules) {
    rules.forEach((rule) => {
      record = rule.command(record)
    })
  }
  return await record
}
