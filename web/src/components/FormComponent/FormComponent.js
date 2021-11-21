import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  TextAreaField,
  Submit,
  PasswordField,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { Link, routes, navigate, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const FormComponent = (props) => {
  console.log('props', props)
  console.log('record', props.record)
  console.log('fields', props.fields)
  console.log('roles', props.roles)
  console.log('onSave', props.onSave)
  console.log('mutations', props.mutations)
  const { hasRole } = useAuth()
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  const onSubmit = (data) => {
    //console.log('on save data', data)
    /**Client RUles go here */
    props.onSave(data, props?.record?.id)
  }
  const [deleteRecord] = useMutation(props.mutations.deleteRecord, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteRecord({ variables: { id } })
    }
  }

  let formLabelClass = 'flex border-b border-gray-200 h-12 py-3 items-center'
  let formLabelClassError =
    'flex border-b border-gray-200 h-12 py-3 items-center'
  let formTextFieldClass = 'focus:outline-none px-3 w-5/6'
  let labelAndFieldList = () => {
    return props.fields.map((field) => {
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
        let dateArr = props?.record?.[field.name].split(':')
        let modifiedDate = `${dateArr[0]}:${dateArr[1]}`
        field.html = (
          <>
            {modifiedDate}
            <DatetimeLocalField
              name={field.name}
              value={modifiedDate || params.get(field.name)}
              className={formTextFieldClass}
              errorClassName={formTextFieldClass}
              placeholder={field.placeHolder}
              readOnly={hasRole(['admin', 'userUpdate']) !== true}
              config={{ required: field.required }}
            />
          </>
        )
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
            {field.readOnly ? (
              <span className="text-left px-2 w-5/6">
                {props?.record?.[field.name]}
              </span>
            ) : field.type === 'PasswordField' ? (
              <PasswordField
                name={field.name}
                className={formTextFieldClass}
                errorClassName={formTextFieldClass}
                placeholder={field.placeHolder}
                autoComplete={'new-password'}
                config={{ required: field.required }}
              />
            ) : (
              field.html
            )}
          </Label>
        </div>
      )
    })
  }
  return (
    <>
      <div className="rounded-md">
        <Link
          to={routes.groups()}
          className="text-sm leading-5 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          Back to groups
        </Link>
        <Form onSubmit={onSubmit} error={props.error}>
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />
          <section>
            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
              {props.record?.name || 'New Group'}
            </h2>
            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
              {labelAndFieldList(
                (() => {
                  let returnArray = []
                  if (props.record?.id) {
                    returnArray.push({
                      name: 'id',
                      prettyName: 'ID',
                      readOnly: true,
                    })
                  }
                  return returnArray
                })()
              )}
            </fieldset>
          </section>
          <div className="flex">
            <Submit
              disabled={props.loading}
              className="submit-button px-4 py-3 rounded-full bg-blue-400 hover:bg-blue-700 text-white focus:ring focus:outline-none w-2/3 text-xl font-semibold transition-colors"
            >
              Save
            </Submit>
            {hasRole(props.roles.delete.concat(['admin'])) && (
              <button
                type="button"
                className="submit-button px-4 py-3 rounded-full bg-red-400 hover:bg-red-700 text-white focus:ring focus:outline-none w-1/3 text-xl font-semibold transition-colors"
                onClick={() => onDeleteClick(props?.record.id)}
              >
                Delete
              </button>
            )}
          </div>
        </Form>
      </div>
    </>
  )
}

export default FormComponent
