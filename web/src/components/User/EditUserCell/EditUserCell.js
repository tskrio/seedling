import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import GroupMembersByUserCell from 'src/components/GroupMember/GroupMembersByUserCell'

export const QUERY = gql`
  query EditUserById($id: Int!) {
    user: user(id: $id) {
      id
      createdAt
      updatedAt
      email
      name
    }
  }
`
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      email
      name
    }
  }
`
const DELETE_USER_MUTATION = gql`
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
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
      navigate(routes.users())
    },
  })

  const onSubmit = (data) => {
    console.log('on save data', data)
    /**Client RUles go here */
    onSave(data, user.id)
  }
  const onSave = (input, id) => {
    console.log(`onSave of edit`, input, id)
    updateUser({ variables: { id, input } })
  }
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
    },
    {
      name: 'email',
      prettyName: 'Email',
    },
    {
      name: 'hashedPassword',
      prettyName: 'Password',
      type: 'password',
      placeHolder: 'Only set this if you want to change it',
    },
  ]
  const roles = {
    update: ['userUpdate'],
    delete: ['userDelete'],
  }
  return (
    <>
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
      <GroupMembersByUserCell userID={user} />
    </>
  )
}
