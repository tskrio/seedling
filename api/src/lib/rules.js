import { UserInputError } from '@redwoodjs/graphql-server'
import { camelCase } from 'camel-case'
import pluralize from 'pluralize'

import allRules from 'src/rules/**/**.{js,ts}'

import { logger } from 'src/lib/logger'
import { log } from 'src/lib/util'
// let timeRemaining = 10000
// let shortenFile = (fileName) => {
//   // return everything after /rules/
//   let regex = /(.+\/rules)(.+)/gm
//   return fileName.replace(regex, `$2`)
// }
let loadRules = async (allRules, table, when, operation) => {
  let arrRules = Object.keys(allRules).map((k) => allRules[k])
  arrRules.sort((a, b) => a?.order - b?.order)
  console.log({ function: 'loadRules', allRulesLength: arrRules.length})
  // lets filter out rules that are on this table.
  table = camelCase(pluralize(table, 1), { pascalCase: false })
  console.log({ function: 'loadRules', table, when, operation})
  let tableRules = arrRules.filter((rule) => {
    // table could be plural, or singular or in pascal case.
    // rules needs to be in singular pascal case.
    // so we need to convert table to singular pascal case.
    // we also need to include rules that run in all cases
    if ( rule.table === table || rule.table === 'all' ) {
      return true
    } else {
      return false
    }
  })
  console.log({ tableRulesLength: tableRules.length})
  // lets filter out rules that are not active.
  let activeRules = tableRules.filter((rule) => {
    if ( rule.active ) {
      return true
    } else {
      return false
    }
  })
  console.log({ activeRulesLength: activeRules.length})
  // lets filter out rules that are not included in the when array.
  // e.g. rule file has a when ['before', 'after']
  // but when we are calling this we only pass a string like 'before'
  let whenRules = activeRules.filter((rule) => {
    if( rule.when.includes(when) ) {
      return true
    } else {
      return false
    }
  })
  console.log({ whenRulesLength: whenRules.length})
  // lets filter out rules that are not included in the operation array.
  // e.g. rule file has a operation ['create', 'update']
  // but when we are calling this we only pass a string like 'create'
  let operationRules = whenRules.filter((rule) => {
    console.log({ ruleOperation: rule.operation, operation })
    if( rule.operation.includes(operation) ) {
      return true
    } else {
      return false
    }
  })
  console.log({ operationRulesLength: operationRules.length})
  operationRules.forEach((rule) => {
    console.log({ rule: rule.file })
  })
  let rulesWithRequiredFields = operationRules.filter((rule) => {
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
  //let ruleNames = arrRules.map((rule) => {
  //  return `${rule.order} ${shortenFile(rule.file)}`
  //})
  //let message = [arrRules.length, table, when, operation]
  //logger.info(`${message.join(' ')} rules loaded \n${ruleNames.join('\n')}`)
  return (await rulesWithRequiredFields) || []
}
let exitWhenNotSuccess = (status) => {
  if (status.code != 'success') {
    console.log(`Error in ${status?.file}`)
    log(
      `${status.message || `Status code != "success"`}`,
      `api\\${status.file}`
    )
    throw new UserInputError(status?.message || `Error in ${status?.file}`)
  }
}


export const executeRules = async ({
  table,
  when,
  operation,
  data,
  cuid,
  page,
  where,
  skip,
  orderBy,
  take
}) => {
  let rules = await loadRules(allRules, table, when, operation)
  console.log({ rulesLength: rules.length })
  console.log({ firstRule: rules[0]})
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    console.log({ message: 'running rule on this data', file: rule.file, data })
    await rule.command({ data, cuid, page, where, skip, orderBy, take, status })
    console.log({ message: 'rule completed on this data', file: rule.file, data })
  })
  exitWhenNotSuccess(status)
  return { data, cuid, page, where, skip, orderBy, take, status }
}

/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeBeforeCreateRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'before', 'create')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ data, status })
  })
  exitWhenNotSuccess(status)
  return { data, status }
}

/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeAfterCreateRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'after', 'create')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ data, status })
  })
  exitWhenNotSuccess(status)
  // we return status as part of the return object
  return { record: data, status }
}
/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeBeforeReadAllRulesV2 = async ({ table, filter, q }) => {
  let rules = await loadRules(allRules, table, 'before', 'readAll')
  let where = []
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ where, filter, q, status })
  })
  exitWhenNotSuccess(status)
  // we return status as part of the return object
  return { where, filter, q }
}
export const executeAfterReadAllRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'after', 'readAll')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ data, status })
  })
  exitWhenNotSuccess(status)
  // we return status as part of the return object
  return { records: data, status }
}

/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeBeforeUpdateRulesV2 = async ({ table, data, cuid }) => {
  let rules = await loadRules(allRules, table, 'before', 'update')
  let status = { code: 'success', message: '' }
  for (let rule of rules /* needs to be a for of to allow break */) {
    try {
      if (status.code == 'success') {
        status.file = rule.file.split('\\dist\\')[1]
        let output = await rule.command({ data, status, cuid })
        status = output?.status
      }
    } catch (error) {
      status = { code: 'error from catch', message: error }
      break // stops other rules from running
    }
  }
  exitWhenNotSuccess(status)
  return { data, status }
}

export const executeBeforeDeleteRulesV2 = async ({ table, cuid }) => {
  let rules = await loadRules(allRules, table, 'before', 'delete')
  let status = { code: 'success', message: '' }
  for (let rule of rules /* needs to be a for of to allow break */) {
    try {
      let output = await rule.command({ cuid, status })
      status = output.status
    } catch (error) {
      console.log(error)
      status = { code: 'error from catch', message: error }
      break
    }
  }
  exitWhenNotSuccess(status)
  return { cuid, status }
}
export const executeAfterDeleteRulesV2 = async ({ table, data }) => {
  console.log('starting executeafterdeleterulesv2', table, data)
  let rules = await loadRules(allRules, table, 'after', 'delete')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ data, status })
  })
  exitWhenNotSuccess(status)
  return { data, status }
}

/**
 * Runs the rules before create across all models
 * @param {string} table - the model you're running rules for
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
 * @param {object} data - the object of elements you want to insert
 * @returns {object} { data, status }
 */
export const executeAfterUpdateRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'after', 'update')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    console.log({ function: 'executeAfterUpdateRulesV2', rule: rule.file })
    await rule.command({ data, status })
  })
  exitWhenNotSuccess(status)
  // we return status as part of the return object
  return { record: data, status }
}

export const executeBeforeReadRulesV2 = async ({ table, cuid }) => {
  let rules = await loadRules(allRules, table, 'before', 'read')
  let where = []
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ where, cuid, status: status })
  })
  exitWhenNotSuccess(status)
  return { where: where[0], cuid, status }
}

export const executeAfterReadRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'after', 'read')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ data, status })
  })
  // we return status as part of the return object
  return { record: data, status }
}

export const executeBeforeReadRules = async (table, cuid) => {
  let rules = await loadRules(allRules, table, 'before', 'read')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      cuid = await rule.command(cuid)
    })
  }
  return await cuid
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
export const executeBeforeDeleteRules = async (table, cuid) => {
  let rules = await loadRules(allRules, table, 'before', 'delete')
  if (rules.length > 0) {
    rules.forEach((rule) => {
      cuid = rule.command(cuid)
    })
  }
  return await cuid
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
