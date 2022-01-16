import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import { Fragment } from 'react'
import { useAuth } from '@redwoodjs/auth'

export const QUERY = gql`
  query EditUserById($id: Int!) {
    user: user(id: $id) {
      id
      createdAt
      updatedAt
      email
      name
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
    }
  }
`
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      email
      name
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
    }
  }
`
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ user }) => {
  const { currentUser, hasRole } = useAuth()
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    /**TODO: FEAT Client Rules go here */
    onSave(data, user.id)
  }
  const onSave = (input, id) => {
    updateUser({ variables: { id, input } })
  }

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete User ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }
  const fields = [
    {
      // {"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"type":"String","hasDefaultValue":false,"isGenerated":false,"isUpdatedAt":false,"label":"Email","component":"TextField","defaultProp":"defaultValue","deserilizeFunction":"","validation":"{{ required: true }}","listDisplayFunction":"truncate"}
      name: 'email',
      prettyName: 'Email',
      required: 'This is required',
    },

    {
      // {"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"type":"String","hasDefaultValue":true,"default":"","isGenerated":false,"isUpdatedAt":false,"label":"Name","component":"TextField","defaultProp":"defaultValue","deserilizeFunction":"","validation":"{{ required: true }}","listDisplayFunction":"truncate"}
      name: 'name',
      prettyName: 'Name',
      required: 'This is required',
    },
  ]
  if (currentUser.id === user.id) {
    fields.push({
      name: 'hashedPassword',
      prettyName: 'Password',
      type: 'password',
      placeholder: 'Only set this if you want to change it',
      minLength: { value: 4, message: 'Minimum length should be 4' },
    })
  }
  if (hasRole(['admin'])) {
    fields.push({
      name: 'resetToken',
      prettyName: 'resetToken (only visible to admins)',
      type: 'password',
      defaultValue: user.resetToken, //doesn't work with password type
      placeholder: 'Only set this if you want to change it',
      //minLength: { value: 4, message: 'Minimum length should be 4' },
    })
    fields.push({
      name: 'resetTokenExpiresAt',
      prettyName: 'resetTokenExpires (only visible to admins)',
      type: 'dateTime',
      placeholder: 'Only set this if you want to change it',
      //minLength: { value: 4, message: 'Minimum length should be 4' },
    })
  }
  const roles = {
    update: ['userUpdate'],
    delete: ['userDelete'],
  }

  return (
    <Fragment>
      <MetaTags
        title={`user.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={user}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.users()}
      />
    </Fragment>
  )
}
