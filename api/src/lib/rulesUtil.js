import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'
import { UserInputError } from '@redwoodjs/graphql-server'

let _loadRules = (rules, when, type) => {
  //console.log('in rulesUtil with rules', rules)
  let rulesArr = Object.keys(rules).map((k) => rules[k]) //from obj to arr of objs
  rulesArr.sort((a, b) => a.order - b.order) //order rules asc
  rulesArr = rulesArr.filter((rule) => {
    let requiredFields = [
      'title',
      'order',
      'when',
      'type',
      'command',
      'active',
      'file',
    ]
    var errors = false
    requiredFields.forEach((field) => {
      //console.log('field: ', field, `rule[${field}]: `, rule[field])
      if (!rule[field]) {
        errors = true
        logger.error(
          `${field} is required for rule ${rule?.title || rule?.file}`
        )
        //return false
        errors = true
      }
    })
    if (!errors) {
      return rule.active === true
    } else {
      return false
    }
  })
  rulesArr = rulesArr.filter((rule) => {
    if (rule.when.includes(when) && rule.type.includes(type)) {
      return true
    } else {
      return false
    }
  })
  return rulesArr
}


export const runBeforeRules = async(id,input, rules, dbName) => {
  //run before rule
  console.log('input', input)
  let beforeUpdateRulesArr = loadRules(rules, 'before', 'update')
  let previous = await db[dbName].findUnique({
    where: { id },
  })
  beforeUpdateRulesArr.forEach((rule) => {
    if (input?._error ) {
      return;
    }
    logger.info(`Starting Before Update Rule "${rule.title}" ${rule.order}`)
    rule.command(input, previous)

    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }
    logger.info(`Ending Before Update Rule "${rule.title}"`)
  })
}

export const runAfterRules = async(id,input, rules) => {
  let afterUpdateRulesArr = loadRules(rules, 'after', 'update')
  afterUpdateRulesArr.forEach((rule) => {
    logger.info(`Starting After Update Rule "${rule.title}" ${rule.order}`)
    rule.command(update, previous)
    logger.info(`Ending After Update Rule "${rule.title}"`)
  })
}

export const loadRules = _loadRules
