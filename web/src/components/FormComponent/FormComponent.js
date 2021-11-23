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
const FormComponent = (props) => {
  const { hasRole } = useAuth()
  const { search } = useLocation()
  let params = new URLSearchParams(search)

  let formLabelClass = 'flex border-b border-gray-200 h-12 py-3 items-center'
  let formLabelClassError =
    'flex border-b border-gray-200 h-12 py-3 items-center'
  let formTextFieldClass = 'focus:outline-none px-3 w-5/6'
  let labelAndFieldList = () => {
    return props.fields.map((field) => {
      if (field.readOnly) {
        field.html = (() => {
          if (field.type === 'dateTime') {
            return (
              <span className="text-left px-2 w-5/6">
                {
                  new Date(
                    props?.record?.[field.name]
                  ).toLocaleString(/**TODO: User preference! */)
                }
              </span>
            )
          } else {
            return (
              <span className="text-left px-2 w-5/6">
                {props?.record?.[field.name]}
              </span>
            )
          }
        })()
      } else {
        field.html = (
          <TextField
            name={field.name}
            defaultValue={props?.record?.[field.name] || params.get(field.name)}
            className={formTextFieldClass}
            errorClassName={formTextFieldClass}
            placeholder={field.placeHolder}
            readOnly={hasRole(['admin', 'userUpdate']) !== true}
            config={{ required: field.required }}
          />
        )
        if (field.type === 'dateTime') {
          //2018-06-12T19:30"
          var dateTemp = new Date(props?.record?.[field.name])
          console.log(props?.record?.[field.name])
          let year = dateTemp.getFullYear()
          let month = (dateTemp.getMonth() + 1).toString().padStart(2, 0)
          let date = dateTemp.getDate().toString().padStart(2, 0)
          let hour = dateTemp.getHours().toString().padStart(2, 0)
          let minute = dateTemp.getMinutes().toString().padStart(2, 0)
          let dateOnly = `${year}-${month}-${date}`
          let timeOnly = `${hour}:${minute}`
          //try {
          //  console.log(timeOnly.split('.'))
          //} catch (e) {
          //  console.log(e)
          //}
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
              defaultValue={
                props?.record?.[field.name] || params.get(field.name)
              }
              className={formTextFieldClass}
              errorClassName={formTextFieldClass}
              placeholder={field.placeHolder}
              readOnly={hasRole(['admin', 'userUpdate']) !== true}
              config={{ required: field.required }}
            />
          )
        }
        if (field.type === 'reference') {
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
              defaultValue={
                props?.record?.[field.name] || params.get(field.name)
              }
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
          to={props.returnLink}
          className="text-sm leading-5 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          Back to list
        </Link>
        <Form onSubmit={props.onSubmit} error={props.error}>
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />
          <section>
            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
              {props.record?.name || props.record?.id || ''}
            </h2>
            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
              {labelAndFieldList()}
            </fieldset>
          </section>
          <div className="flex">
            <span className="p-1 w-full">
              <Submit
                disabled={props.loading}
                className="rw-button rw-button-blue w-full"
              >
                Save
              </Submit>
            </span>

            {hasRole(props.roles.delete.concat(['admin'])) && props.record && (
              <span className="p-1 w-full">
                <button
                  type="button"
                  className="rw-button rw-button-red w-full"
                  onClick={() => props.onDelete(props?.record.id)}
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
