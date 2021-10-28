import { logger } from 'src/lib/logger'


let _loadRules = (rules, when, type) => {
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
      if (!rule[field]) {
        errors = true
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
  run  rule against the input that is being passed with the passed rule type and when
  @param [string] dbName: name of the table
  @param [string] id: id of the table
  @param [object] input object (optional)
  @param [array] rules of the array
  @param [string] rules type
  @param [string] when rule should be executed
  @return [object] modified input
*/
export const runRules = async(dbName, id,input, rules, ruleType, when) => {
  //load all the rules for before
  let rulesArr = loadRules(rules, when, ruleType)

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

export const loadRules = _loadRules
