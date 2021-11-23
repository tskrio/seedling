import { logger } from 'src/lib/logger'
import allRules from 'src/rules/**/**.{js,ts}'
let loadRules = async (allRules, table, when, operation) => {
  let arrRules = Object.keys(allRules).map((k) => allRules[k])
  arrRules.sort((a, b) => a.order - b.order)
  arrRules = arrRules.filter((rule) => {
    if (
      rule.active &&
      rule.table === table &&
      rule.when.includes(when) &&
      rule.operation.includes(operation)
    ) {
      return true
    } else {
      return false
    }
  })
  arrRules = arrRules.filter((rule) => {
    let requiredFields = [
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
      return true
    } else {
      return false
    }
  })
  let ruleNames = arrRules.map((rule) => {
    return `${rule.order} ${rule.file}`
  })
  let message = [arrRules.length, table, when, operation]
  console.log(`${message.join(' ')} rules loaded \n${ruleNames.join('\n')}`)
  return (await arrRules) || []
}
export const executeBeforeCreateRules = async (table, input) => {
  let rules = await loadRules(allRules, table, 'before', 'create')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      input = await rule.command(input)
    })
  }
  return await input
}
export const executeAfterCreateRules = async (table, record) => {
  let rules = await loadRules(allRules, table, 'after', 'create')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      record = await rule.command(record)
    })
  }
  return await record
}
export const executeBeforeReadAllRules = async (table, status) => {
  let rules = await loadRules(allRules, table, 'before', 'readall')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      status = await rule.command()
    })
  }
  return await status
}
export const executeAfterReadAllRules = async (table, records) => {
  let rules = await loadRules(allRules, table, 'after', 'readall')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      records = await rule.command(records)
    })
  }
  return await records
}
export const executeBeforeReadRules = async (table, id) => {
  let rules = await loadRules(allRules, table, 'before', 'read')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      id = await rule.command(id)
    })
  }
  return await id
}
export const executeAfterReadRules = async (table, record) => {
  let rules = await loadRules(allRules, table, 'after', 'read')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      record = await rule.command(record)
    })
  }
  return await record
}
export const executeBeforeUpdateRules = async (table, input) => {
  let rules = await loadRules(allRules, table, 'before', 'update')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      input = await rule.command(input)
    })
  }
  return await input
}
export const executeAfterUpdateRules = async (table, record) => {
  let rules = await loadRules(allRules, table, 'after', 'update')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      record = await rule.command(record)
    })
  }
  return await record
}
export const executeBeforeDeleteRules = async (table, id) => {
  let rules = await loadRules(allRules, table, 'before', 'delete')
  if (rules.length > 0) {
    rules.forEach((rule) => {
      id = rule.command(id)
    })
  }
  return await id
}
export const executeAfterDeleteRules = async (table, record) => {
  let rules = await loadRules(allRules, table, 'after', 'delete')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      record = await rule.command(record)
    })
  }
  return await record
}
