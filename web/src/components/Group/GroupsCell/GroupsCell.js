import { Link, routes, useLocation } from '@redwoodjs/router'
import TableComponent from 'src/components/TableComponent'
export const beforeQuery = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  return {
    variables: {
      filter: params.get('filter'),
      skip: parseInt(params.get('offset'), 10) || 0,
    },
    fetchPolicy: 'no-cache',
  }
}
const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query FindGroups($filter: String, $skip: Int) {
    groups(filter: $filter, skip: $skip) {
      count
      take
      skip
      results {
        id
        name
        description
      }
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
      Header: 'Name',
      accessor: 'nameLink',
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
  let data = groups.results.map((group) => {
    return {
      ...group,
      nameLink: <Link to={routes.group({ id: group.id })}>{group.name}</Link>,
      //createdAt: new Date(
      //  group.createdAt
      //).toLocaleString(/**TODO: User preference! */),
      //updatedAt: new Date(
      //  group.createdAt
      //).toLocaleString(/**TODO: User preference! */),
    }
  })
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
    readRecords: (props) => {
      return routes.groups(props)
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
      count={groups.count}
      skip={groups.skip}
      take={groups.take}
    />
  )
}
