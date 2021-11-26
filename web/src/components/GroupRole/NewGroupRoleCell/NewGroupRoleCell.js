import FormComponent from 'src/components/FormComponent'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
export const QUERY = gql`
  query getGroupRoles {
    groups {
      results {
        id
        name
      }
    }
  }
`
export const CREATE_GROUP_ROLE_MUTATION = gql`
  mutation CreateGroupRoleMutation($input: CreateGroupRoleInput!) {
    createGroupRole(input: $input) {
      id
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groups }) => {
  const [createGroupRole, { loading, error }] = useMutation(
    CREATE_GROUP_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupRole created')
        navigate(routes.groupRoles())
      },
    }
  )
  const onSubmit = (data) => {
    /**TODO: Client Rules go here */
    onSave(data)
  }
  const onSave = (input) => {
    const castInput = Object.assign(input, { groupId: parseInt(input.groupId) })
    createGroupRole({ variables: { input: castInput } })
  }

  const fields = [
    {
      prettyName: 'Group',
      name: 'groupId',
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindReferenceFieldQuery($filter: String, $skip: Int) {
          search: groups(filter: $filter, skip: $skip) {
            count
            take
            skip
            results {
              id
              name
            }
          }
        }
      `,
    },
    {
      name: 'role',
      prettyName: 'Role',
      type: 'select',
      display: 'name',
      value: 'name',
      data: [
        { name: 'userCreate' },
        { name: 'userRead' },
        { name: 'userUpdate' },
        { name: 'userDelete' },
        { name: 'groupCreate' },
        { name: 'groupRead' },
        { name: 'groupUpdate' },
        { name: 'groupDelete' },
        { name: 'groupMemberCreate' },
        { name: 'groupMemberRead' },
        { name: 'groupMemberUpdate' },
        { name: 'groupMemberDelete' },
        { name: 'groupRoleCreate' },
        { name: 'groupRoleRead' },
        { name: 'groupRoleUpdate' },
        { name: 'groupRoleDelete' },
        { name: 'admin' },
      ],
    },
  ]
  const roles = {
    update: ['groupRoleUpdate'],
    delete: ['groupRoleDelete'],
  }
  return (
    <FormComponent
      fields={fields}
      roles={roles}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      returnLink={routes.groupRoles()}
    />
  )
}
