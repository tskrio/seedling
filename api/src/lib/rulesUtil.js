import { logger } from 'src/lib/logger'

export const loadRules = (rules, when, type) => {
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
    requiredFields.forEach((field) => {
      if (!rule[field]) {
        logger.error(
          `${field} is required for rule ${rule?.title || rule?.file}`
        )
        return false
      }
    })
    return rule.active === true
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
