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

/*
  For DB read rules
  run before rule against the records that are being passed
  @param [string] string of the table name
  @param [array] rules of the array
  @return [db object] object
*/

/*
  For DB write rule
  run before rule against the records that are being passed, input will be modified
  @param [id] id of the table
  @param [input] input string
  @param [array] rules of the array
  @return [object] modified input
*/


/*
  For DB create
  run before rule against the records that are being created
  @param [input] input string
  @param [array] rules of the array
  @return [object] modified input
*/



/*
  For DB delete
  run before rule against the records that are being created
  @param [db object] singular record
  @param [array] rules of the array
  @return [db object] object
*/
/*
  run before rule against the records that are being passed

*/

/*
  For DB write rule
  run before rule against the records that are being passed, input will be modified
  @param [string] dbName: name of the table
  @param [string] id: id of the table
  @param [object] input object (optional)
  @param [array] rules of the array
  @return [object] modified input
*/
export const runRules = async(dbName, id,input, rules, ruleType, when) => {
  //run before rule

  //load all the rules for before
  let rulesArr = loadRules(rules, when, ruleType)

  /*if (id) {
    let previous = await db[dbName].findUnique({
      where: { id },
    })
  }*/

  //run all rules against input
  rulesArr.forEach((rule) => {
    if (input?._error ) {
      logger.info(`error detected stopping at ${when} rule "${rule.title}" ${rule.order}`)
      return;
    }

    logger.info(`Starting ${when} Update Rule "${rule.title}" ${rule.order}`)

    rule.command(input, dbName, id)

    for (var prop in input) {
      logger.info(`  ${prop} "${input[prop]}"=>"${input[prop]}"`)
    }

    logger.info(`Ending Before Update Rule "${rule.title}"`)
  })

  return input
}

/*export const runAfterRules = async(id,input, rules) => {

  let afterUpdateRulesArr = loadRules(rules, 'after', 'update')
  afterUpdateRulesArr.forEach((rule) => {
    logger.info(`Starting After Update Rule "${rule.title}" ${rule.order}`)
    rule.command(update, previous)
    logger.info(`Ending After Update Rule "${rule.title}"`)
  })
}*/

export const loadRules = _loadRules
