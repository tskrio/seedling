import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  PasswordField,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { Link, routes, navigate, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`
const UserForm = (props) => {
  const { hasRole } = useAuth()
  const { search } = useLocation()
  let params = new URLSearchParams(search)

  const onSubmit = (data) => {
    //console.log('on save data', data)
    /**Client RUles go here */
    props.onSave(data, props?.user?.id)
  }
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  let formLabelClass = 'flex border-b border-gray-200 h-12 py-3 items-center'
  let formLabelClassError =
    'flex border-b border-gray-200 h-12 py-3 items-center'
  let formTextFieldClass = 'focus:outline-none px-3 w-5/6'
  let labelAndFieldList = (fieldArray) => {
    return fieldArray.map((field) => {
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
                {props?.user?.[field.name]}
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
              <TextField
                name={field.name}
                defaultValue={
                  props?.user?.[field.name] || params.get(field.name)
                }
                className={formTextFieldClass}
                errorClassName={formTextFieldClass}
                placeholder={field.placeHolder}
                readOnly={hasRole(['admin', 'userUpdate']) !== true}
                config={{ required: field.required }}
              />
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
          to={routes.users()}
          className="text-sm leading-5 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          Back to users
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
              {props.user?.name || 'New User'}
            </h2>
            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
              {labelAndFieldList(
                (() => {
                  let returnArray = []
                  if (props.user?.id) {
                    returnArray.push({
                      name: 'id',
                      prettyName: 'ID',
                      readOnly: true,
                    })
                  }
                  returnArray.push(
                    {
                      name: 'name',
                      prettyName: 'Name',
                      readOnly: false,
                    },
                    {
                      name: 'email',
                      prettyName: 'Email',
                      readOnly: false,
                    },
                    {
                      name: 'hashedPassword',
                      prettyName: 'Password',
                      readOnly: false,
                      placeHolder: 'Leave blank to keep current password',
                      type: 'PasswordField',
                    },
                    {
                      name: 'createdAt',
                      prettyName: 'Created At',
                      readOnly: true,
                    },
                    {
                      name: 'updatedAt',
                      prettyName: 'Updated At',
                      readOnly: true,
                    }
                  )
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
            {hasRole(['userDelete', 'admin']) && (
              <button
                type="button"
                className="submit-button px-4 py-3 rounded-full bg-red-400 hover:bg-red-700 text-white focus:ring focus:outline-none w-1/3 text-xl font-semibold transition-colors"
                onClick={() => onDeleteClick(props?.user.id)}
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

export default UserForm
