import { SelectField, Label, FieldError } from '@redwoodjs/forms'
export const QUERY = gql`
  query getRoleEnums {
    roles: __type(name: "Role") {
      name
      enumValues {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ label, defaultValue, roles }) => {
  var options = roles.enumValues.map((role) => {
    return (
      <option key={role.name} value={role.name}>
        {role.name}
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
