import { Link, routes } from '@redwoodjs/router'
import Table from 'src/components/Table/Table'
import { UPDATE_USER_MUTATION } from 'src/components/User/EditUserCell'

export const QUERY = gql`
  query FindGroups {
    groups {
      id
      createdAt
      updatedAt
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No groups yet. '}
      <Link to={routes.newGroup()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groups }) => {
  let meta = {
    title: 'Groups',
    routes: {
      newItem: 'newGroup',
      view: 'group',
      edit: 'editGroup',
    },
    labels: {
      single: 'group',
      multiple: 'groups',
    },
    key: 'id',
    display: 'name',
    columns: [
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'description', label: 'Description', type: 'string' },
      { key: 'createdAt', label: 'Created', type: 'date' },
      { key: 'updatedAt', label: 'Updated', type: 'date' },
    ],
  }
  const DELETE_GROUP_MUTATION = gql`
    mutation DeleteGroupMutation($id: Int!) {
      deleteGroup(id: $id) {
        id
      }
    }
  `
  return (
    <>
      <Table
        data={groups}
        meta={meta}
        query={QUERY}
        deleteMutation={DELETE_GROUP_MUTATION}
        updateUserMutation={UPDATE_USER_MUTATION}
      />
    </>
  )
}
/**
 * <>
      {JSON.stringify(groups)}
      <Table data={groups} meta={meta} />
      <Groups groups={groups} />
    </>
 */
