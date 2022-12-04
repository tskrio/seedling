import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'
export const QUERY = gql`
  query EditUserById($id: Int!) {
    user: user(id: $id) {
      id
      createdAt
      updatedAt
      name
      email
    }
  }
`
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      email
    }
  }
`
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deletedRow: deleteUser(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <FormSkeleton />

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
    // if resetToken is empty delete it
    // if resetTokenExpiresAt is empty delete it
    if (data.resetToken === '') {
      delete data.resetToken
    }
    if (data.resetTokenExpiresAt === '') {
      delete data.resetTokenExpiresAt
    }
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
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDelete = () => {
    let id = user.id
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
      required: 'This is required',
    },
    {
      name: 'role',
      prettyName: 'Role',
      type: 'json',
      defaultValue: { foo: 'bar' },
    },
  ]
  // if (currentUser.id === user.id) {
  //   fields.push({
  //     name: 'hashedPassword',
  //     prettyName: 'Password',
  //     type: 'password',
  //     placeholder: 'Only set this if you want to change it',
  //     minLength: { value: 4, message: 'Minimum length should be 4' },
  //   })
  // }
  if (hasRole(['admin'] || currentUser.id === user.id)) {
    fields.push({
      prettyName: 'Email',
      name: 'email',
    })
  }
  //   fields.push({
  //     name: 'resetToken',
  //     prettyName: 'resetToken (only visible to admins)',
  //     type: 'password',
  //     defaultValue: user.resetToken, //doesn't work with password type
  //     placeholder: 'Only set this if you want to change it',
  //     //minLength: { value: 4, message: 'Minimum length should be 4' },
  //   })
  //   fields.push({
  //     name: 'resetTokenExpiresAt',
  //     prettyName: 'resetTokenExpires (only visible to admins)',
  //     type: 'dateTime',
  //     placeholder: 'Only set this if you want to change it',
  //     //minLength: { value: 4, message: 'Minimum length should be 4' },
  //   })
  // }
  const roles = {
    update: ['userUpdate'],
    delete: ['userDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
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
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
