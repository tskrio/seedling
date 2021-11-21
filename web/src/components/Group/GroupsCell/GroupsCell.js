import { Link, routes } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`
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
  let title = 'Groups'
  let columns = [
    {
      Header: 'Created At',
      accessor: 'createdAt', // accessor is the "key" in the data
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]
  let data = groups
  let queries = {
    QUERY: QUERY,
    DELETEMUTATION: DELETE_GROUP_MUTATION,
  }
  let recordRoutes = {
    editRecord: (prop) => {
      return routes.group(prop)
    },
    createRecord: () => {
      return routes.newGroup()
    },
  }
  let display = 'id'
  let roles = {
    createRecord: ['groupCreate'],
    updateRecord: ['groupUpdate'],
    readRecord: ['groupRead'],
    deleteRecord: ['groupDelete'],
  }
  let queryVariables = {}
  return (
    <TableComponent
      title={title}
      columns={columns}
      data={data}
      queries={queries}
      routes={recordRoutes}
      display={display}
      roles={roles}
      queryVariables={queryVariables}
    />
  )

  //  let meta = {
  //    title: 'Groups',
  //    routes: {
  //      newItem: (prop) => {
  //        return routes.newGroup(prop)
  //      },
  //      view: (prop) => {
  //        return routes.group(prop)
  //      },
  //      edit: (prop) => {
  //        return routes.editGroup(prop)
  //      },
  //    },
  //    labels: {
  //      single: 'group',
  //      multiple: 'groups',
  //    },
  //    key: 'id',
  //    display: 'name',
  //    columns: [
  //      { key: 'name', label: 'Name', type: 'string' },
  //      { key: 'description', label: 'Description', type: 'string' },
  //      { key: 'createdAt', label: 'Created', type: 'date' },
  //      { key: 'updatedAt', label: 'Updated', type: 'date' },
  //    ],
  //    createRoles: ['groupCreate'],
  //    readRoles: ['groupRead'],
  //    updateRoles: ['groupUpdate'],
  //    deleteRoles: ['groupDelete'],
  //  }
  //  const DELETE_GROUP_MUTATION = gql`
  //    mutation DeleteGroupMutation($id: Int!) {
  //      deleteGroup(id: $id) {
  //        id
  //      }
  //    }
  //  `
  //  return (
  //    <>
  //      <Table
  //        data={groups}
  //        meta={meta}
  //        query={QUERY}
  //        deleteMutation={DELETE_GROUP_MUTATION}
  //      />
  //    </>
  //  )
}
