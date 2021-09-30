import { Label, SelectField } from '@redwoodjs/forms'
const RoleSelect = ({ label, defaultValue, choices }) => {
  let altText = 'Find me in ./web/src/components/RoleSelect/RoleSelect.js'
  var options = choices.map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    )
  })
  return (
    <>
      <Label
        name="role"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        {label}
      </Label>

      <SelectField
        name="role"
        defaultValue={defaultValue}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      >
        <option value="">Pick One</option>
        {options}
      </SelectField>
    </>
  )
}

export default RoleSelect
