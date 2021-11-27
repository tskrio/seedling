import { Link, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
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
const DELETE_PREFERENCE_MUTATION = gql`
  mutation DeletePreferenceMutation($id: Int!) {
    deletePreference(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query FindPreferences($filter: String, $skip: Int) {
    preferences(filter: $filter, skip: $skip) {
      count
      take
      skip
      results {
        id
        entity
        value
        user {
          id
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No preferences yet. '}
      <Link to={routes.newPreference()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ preferences }) => {
  let title = 'Preferences'
  let columns = [
    {
      Header: 'Entity',
      accessor: 'entity',
    },
    {
      Header: 'Value',
      accessor: 'value',
    },
    {
      Header: 'User',
      accessor: 'userLink',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]
  let data = preferences.results.map((preference) => {
    return {
      ...preference,
      userLink: (
        <Link to={routes.user({ id: preference.user.id })}>
          {preference.user.name}
        </Link>
      ),
    }
  })
  let queries = {
    QUERY: QUERY,
    DELETEMUTATION: DELETE_PREFERENCE_MUTATION,
  }
  let recordRoutes = {
    editRecord: (prop) => {
      return routes.preference(prop)
    },
    createRecord: () => {
      return routes.newPreference()
    },
    readRecords: (props) => {
      return routes.preferences(props)
    },
  }
  let display = 'id'
  let roles = {
    createRecord: [],
    updateRecord: [],
    readRecord: ['preferenceRead'],
    deleteRecord: [],
  }
  let queryVariables = {}
  return (
    <>
      <MetaTags
        title="Preferences"
        description="All preferences"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <TableComponent
        title={title}
        columns={columns}
        data={data}
        queries={queries}
        routes={recordRoutes}
        display={display}
        roles={roles}
        queryVariables={queryVariables}
        count={preferences.count}
        skip={preferences.skip}
        take={preferences.take}
      />
    </>
  )
}
