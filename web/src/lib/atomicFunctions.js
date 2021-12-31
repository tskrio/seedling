import { routes } from '@redwoodjs/router'

export const showMatching = (model, field, value) => {
  var _value = `"${value}"`
  if (field.dataType == 'integer') _value = value
  var _field = `"${field.accessor}"`
  if (field.field) _field = `"${field.accessor}": {"${field.field}"`
  if (field.field) _value = `${_value}}`
  return routes[model]({ q: `{${_field}: ${_value}}` })
}
export const filterOut = (model, field, value) => {
  var _value = `"${value}"`
  if (field.dataType == 'integer') _value = value
  var _field = `"${field.accessor}"`
  if (field.field) _field = `"${field.accessor}": {"${field.field}"`
  if (field.field) _value = `${_value}}`
  return routes[model]({ q: `{${_field}: {"not":${_value}}}` })
}
export const copy = (value) => {
  navigator.clipboard.writeText(value)
}
