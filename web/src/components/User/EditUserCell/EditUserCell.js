import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import GroupMembersByUserCell from 'src/components/GroupMember/GroupMembersByUserCell'
import { useAuth } from '@redwoodjs/auth'

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
  const { currentUser } = useAuth()
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
      navigate(routes.users())
    },
  })

  const onSubmit = (data) => {
    console.log('saving', data)
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
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
      required: 'Name is required',
    },
    {
      name: 'email',
      prettyName: 'Email',
      required: 'Email is required',
    },
  ]
  if (currentUser.id === user.id) {
    fields.push({
      name: 'hashedPassword',
      prettyName: 'Password',
      type: 'password',
      placeHolder: 'Only set this if you want to change it',
      minLength: { value: 4, message: 'Minimum length should be 4' },
    })
  }
  const roles = {
    update: ['userUpdate'],
    delete: ['userDelete'],
  }
  return (
    <>
      <MetaTags
        title={user.name}
        description={`${user.name}'s user`}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
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
      <GroupMembersByUserCell userID={user} />
    </>
  )
}
