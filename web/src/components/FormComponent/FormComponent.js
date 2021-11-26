import {
  Form,
  FormError,
  Label,
  DateField,
  TimeField,
  TextField,
  SelectField,
  TextAreaField,
  Submit,
  PasswordField,
} from '@redwoodjs/forms'
import { Link, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import ReferenceField from 'src/components/ReferenceField'
const FormComponent = ({
  record,
  fields,
  roles,
  onSubmit,
  onDelete,
  loading,
  error,
  returnLink,
}) => {
  const { hasRole } = useAuth()
  const { search } = useLocation()
  let params = new URLSearchParams(search)

  let formLabelClass = 'flex border-b border-gray-200 h-12 py-3 items-center'
  let formLabelClassError =
    'flex border-b border-gray-200 h-12 py-3 items-center'
  let formTextFieldClass = 'focus:outline-none px-3 w-5/6 border-b'
  let labelAndFieldList = () => {
    return fields.map((field) => {
      if (field.readOnly) {
        field.html = (() => {
          if (field.type === 'dateTime') {
            return (
              <span className="text-left px-2 w-5/6">
                {
                  new Date(
                    record?.[field.name]
                  ).toLocaleString(/**TODO: User preference! */)
                }
              </span>
            )
          } else {
            return (
              <span className="text-left px-2 w-5/6">
                {record?.[field.name]}
              </span>
            )
          }
        })()
      } else {
        field.html = (
          <TextField
            name={field.name}
            defaultValue={
              record?.[field.name] ||
              field.defaultValue ||
              params.get(field.name)
            }
            className={formTextFieldClass}
            errorClassName={formTextFieldClass}
            placeholder={field.placeHolder}
            readOnly={hasRole(['admin', 'userUpdate']) !== true}
            config={{ required: field.required }}
          />
        )
        if (field.type === 'dateTime') {
          //2018-06-12T19:30"
          var dateTemp = new Date(record?.[field.name])
          let year = dateTemp.getFullYear()
          let month = (dateTemp.getMonth() + 1).toString().padStart(2, 0)
          let date = dateTemp.getDate().toString().padStart(2, 0)
          let hour = dateTemp.getHours().toString().padStart(2, 0)
          let minute = dateTemp.getMinutes().toString().padStart(2, 0)
          let dateOnly = `${year}-${month}-${date}`
          let timeOnly = `${hour}:${minute}`
          field.html = (
            <>
              <TextField
                name={field.name}
                defaultValue={
                  `${dateOnly}T${timeOnly}.000Z` || params.get(field.name)
                }
                className={formTextFieldClass}
                errorClassName={formTextFieldClass}
                placeholder={field.placeHolder}
                config={{ required: field.required }}
              />
              <DateField
                name={field.name + '-date'}
                defaultValue={dateOnly || params.get(field.name)}
                className={formTextFieldClass}
                errorClassName={formTextFieldClass}
                placeholder={field.placeHolder}
                readOnly={hasRole(['admin', 'userUpdate']) !== true}
                config={{ required: field.required }}
              />
              <TimeField
                name={field.name + '-time'}
                defaultValue={timeOnly || params.get(field.name)}
                className={formTextFieldClass}
                errorClassName={formTextFieldClass}
                placeholder={field.placeHolder}
                readOnly={hasRole(['admin', 'userUpdate']) !== true}
                config={{ required: field.required }}
              />
            </>
          )
        }
        if (field.type === 'textArea') {
          field.html = (
            <TextAreaField
              name={field.name}
              defaultValue={record?.[field.name] || params.get(field.name)}
              className={formTextFieldClass}
              errorClassName={formTextFieldClass}
              placeholder={field.placeHolder}
              readOnly={hasRole(['admin', 'userUpdate']) !== true}
              config={{ required: field.required }}
            />
          )
        }
        if (field.type === 'select') {
          let options = field.data.map((option) => {
            return (
              <option key={option[field.value]} value={option[field.value]}>
                {option[field.display]}
              </option>
            )
          })
          field.html = (
            <SelectField
              name={field.name}
              defaultValue={record?.[field.name] || params.get(field.name)}
            >
              {options}
            </SelectField>
          )
        }
        if (field.type === 'password') {
          field.html = (
            <PasswordField
              name={field.name}
              className={formTextFieldClass}
              errorClassName={formTextFieldClass}
              placeholder={field.placeHolder}
              autoComplete={'new-password'}
              config={{ required: field.required }}
            />
          )
        }
        if (field.type === 'reference') {
          let _field = { ...field }
          delete _field.html
          field.html = <ReferenceField field={_field} />
        }
      }
      return (
        <div key={field.name}>
          <Label
            name={field.name}
            className={formLabelClass}
            errorClassName={formLabelClassError}
          >
            <span className="whitespace-nowrap text-right px-2 w-1/6">
              {field.prettyName}
            </span>
            {field.html}
          </Label>
        </div>
      )
    })
  }
  return (
    <>
      <div className="rounded-md">
        <Link
          to={returnLink}
          className="text-sm leading-5 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          Back to list
        </Link>
        <Form onSubmit={onSubmit} error={error}>
          <FormError
            error={error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />
          <section>
            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
              {record?.name || record?.id || ''}
            </h2>
            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
              {labelAndFieldList()}
            </fieldset>
          </section>
          <div className="flex">
            <span className="p-1 w-full">
              <Submit
                disabled={loading}
                className="rw-button rw-button-blue w-full"
              >
                Save
              </Submit>
            </span>

            {hasRole(roles.delete.concat(['admin'])) && record && (
              <span className="p-1 w-full">
                <button
                  type="button"
                  className="rw-button rw-button-red w-full"
                  onClick={() => onDelete(record.id)}
                >
                  Delete
                </button>
              </span>
            )}
          </div>
        </Form>
      </div>
    </>
  )
}

export default FormComponent
