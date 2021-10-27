import { Link, routes } from '@redwoodjs/router'
import Table from 'src/components/Table/Table'

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
      newItem: (prop) => {
        return routes.newGroup(prop)
      },
      view: (prop) => {
        return routes.group(prop)
      },
      edit: (prop) => {
        return routes.editGroup(prop)
      },
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
    createRoles: ['groupCreate'],
    readRoles: ['groupRead'],
    updateRoles: ['groupUpdate'],
    deleteRoles: ['groupDelete'],
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
      />
    </>
  )
}
