import { logger } from 'src/lib/logger'

export const loadRules = (rules, when, type) => {
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
