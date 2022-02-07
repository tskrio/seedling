import { logger } from 'src/lib/logger'
import { UserInputError } from '@redwoodjs/graphql-server'
let timeRemaining = 10000
import allRules from 'src/rules/**/**.{js,ts}'
let shortenFile = (fileName) => {
  // return everything after /rules/
  let regex = /(.+\/rules)(.+)/gm
  return fileName.replace(regex, `$2`)
}
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
  //let ruleNames = arrRules.map((rule) => {
  //  return `${rule.order} ${shortenFile(rule.file)}`
  //})
  //let message = [arrRules.length, table, when, operation]
  //logger.info(`${message.join(' ')} rules loaded \n${ruleNames.join('\n')}`)
  return (await arrRules) || []
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
  if (status.code != 'success') {
    throw new UserInputError('fromrules-' + status?.message)
  }
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
  console.log('before query rules', filter, q)
  let where = []
  rules.forEach(async (rule) => {
    await rule.command({ where, filter, q })
  })
  // console.log('rules where', where)
  // we return status as part of the return object
  return { where, filter, q }
}
export const executeAfterReadAllRulesV2 = async ({ table, data }) => {
  let rules = await loadRules(allRules, table, 'after', 'readAll')
  let status = { code: 'success', message: '' }
  rules.forEach(async (rule) => {
    await rule.command({ data, status })
  })
  // we return status as part of the return object
  return { records: data, status }
}
export const executeBeforeCreateRules = async (table, input) => {
  // track time passed.  cannot exceed 10 seconds
  let rules = await loadRules(allRules, table, 'before', 'create')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      // track time passed
      let startRule = Date.now()
      input = await rule.command(input)
      // track time passed
      let endRule = Date.now()
      let timePassed = endRule - startRule
      timeRemaining -= timePassed
      logger.info(
        `${timeRemaining / 1000}s / 10s ${rule.order} ${shortenFile(
          rule.file
        )} took ${timePassed / 1000}s to execute.`
      )
      if (timeRemaining < 0) {
        logger.error(
          `${shortenFile(rule.file)} exceeded 10 seconds for ${table} ${
            rule.when
          } ${rule.operation}`
        )
      }
    })
  }
  return await input
}
export const executeAfterCreateRules = async (table, record) => {
  let rules = await loadRules(allRules, table, 'after', 'create')
  if (rules.length > 0) {
    rules.forEach(async (rule) => {
      // track time passed
      let startRule = Date.now()
      record = await rule.command(record)

      // track time passed
      let endRule = Date.now()
      let timePassed = endRule - startRule
      timeRemaining -= timePassed
      logger.info(
        `${timeRemaining / 1000}s / 10s ${shortenFile(rule.file)} took ${
          timePassed / 1000
        }s to execute.`
      )

      if (timeRemaining < 0) {
        logger.error(
          `${shortenFile(rule.file)} exceeded 10 seconds for ${table} ${
            rule.when
          } ${rule.operation}`
        )
      }
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
