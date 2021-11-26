import FormComponent from 'src/components/FormComponent'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
export const QUERY = gql`
  query getGroupsAndUsers {
    groups {
      results {
        id
        name
      }
    }
    users {
      results {
        id
        name
      }
    }
  }
`
const CREATE_GROUP_MEMBER_MUTATION = gql`
  mutation CreateGroupMemberMutation($input: CreateGroupMemberInput!) {
    createGroupMember(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = () => {
  const [createGroupMember, { loading, error }] = useMutation(
    CREATE_GROUP_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupMember created')
        navigate(routes.groupMembers())
      },
    }
  )

  const onSubmit = (data) => {
    /**TODO: FEAT Client Rules go here */
    onSave(data)
  }
  const onSave = (input) => {
    const castInput = Object.assign(input, {
      userId: parseInt(input.userId),
      groupId: parseInt(input.groupId),
    })
    createGroupMember({ variables: { input: castInput } })
  }
  const fields = [
    //{
    //  name: 'groupId',
    //  prettyName: 'Group',
    //  type: 'select',
    //  display: 'name',
    //  value: 'id',
    //  data: [
    //    {
    //      name: 'Pick one',
    //      id: '',
    //    },
    //  ].concat(groups.results),
    //},
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
      prettyName: 'User',
      name: 'userId',
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindReferenceFieldQuery($filter: String, $skip: Int) {
          search: users(filter: $filter, skip: $skip) {
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
    //{
    //  name: 'userId',
    //  prettyName: 'User',
    //  type: 'select',
    //  display: 'name',
    //  value: 'id',
    //  data: [
    //    {
    //      name: 'Pick one',
    //      id: '',
    //    },
    //  ].concat(users.results),
    //},
  ]
  const roles = {
    update: ['groupMemberUpdate'],
    delete: ['groupMemberDelete'],
  }

  return (
    <FormComponent
      fields={fields}
      roles={roles}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      returnLink={routes.groupMembers()}
    />
  )
}
