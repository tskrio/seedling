import FormComponent from 'src/components/FormComponent'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes, useParams, useLocation } from '@redwoodjs/router'
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
  const { search } = useLocation()
  let params = new URLSearchParams(search)
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
    {
      prettyName: 'Group',
      name: 'groupId',
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindReferenceFieldQueryNewGroupMemberGroup(
          $filter: String
          $skip: Int
        ) {
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
      defaultValue: params.get('userId'),
      defaultDisplay: params.get('userName'),
      QUERY: gql`
        query FindReferenceFieldQueryNewGroupMemberMember(
          $filter: String
          $skip: Int
        ) {
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
