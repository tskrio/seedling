import { Link, routes, useLocation } from '@redwoodjs/router'
import { Fragment, useState, useMemo, useEffect } from 'react'
//import { MetaTags } from '@redwoodjs/web'
//import TableComponent from 'src/components/TableComponent'
const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`
export const beforeQuery = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  console.log(props)
  return {
    variables: {
      q: params.get('q'),
      filter: props.queryFromPage || params.get('filter'),
      skip: props.skip || 0,
      take: props.take || 10,
      orderBy: props.orderBy || params.get('orderBy'),
    },
    fetchPolicy: 'no-cache',
  }
}
export const QUERY = gql`
  query FindUsers(
    $filter: String
    $skip: Int
    $take: Int
    $q: String
    $orderBy: OrderByInput
  ) {
    users(filter: $filter, skip: $skip, take: $take, q: $q, orderBy: $orderBy) {
      count
      take
      skip
      q
      results {
        id
        createdAt
        updatedAt
        email
        name
        GroupMember {
          id
          group {
            id
            name
          }
        }
        Preference {
          id
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link to={routes.newUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  users,
  queryFromPage,
  setQueryFromPage,
  columns,
  setColumns,
  orderBy,
  setOrderBy,
  skip,
  setSkip,
  take,
  setTake,
}) => {
  // useEffect(() => {
  //   let _columns = columns.concat([{ accessor: 'actions', Header: 'Actions' }])
  //   setColumns(_columns)
  // }, [''])
  const { search } = useLocation()
  let params = new URLSearchParams(search)

  let [query, setQuery] = useState(queryFromPage)
  let [data, setData] = useState(users)
  let handleSearchInput = (event) => {
    setQuery(event.target.value)
  }
  let handleSearchButton = () => {
    console.log(`searching for ${query}`)
    setQueryFromPage(query)
  }
  let handleTakeInput = (event) => {
    console.log(event.target.value)
    setTake(parseInt(event.target.value, 10))
  }
  let handleRemoveItem = (event) => {
    setData({
      ...users,
      results: data.results.filter((user) => {
        return !(user.id === parseInt(event.target.value, 10))
      }),
    })
  }
  //  const memoizedColumns = React.useMemo(() => [], columns, [columns])
  let tableColumns = columns.map((column) => {
    return (
      <td key={column.accessor}>
        {column.Header}
        {column.accessor != 'actions' && (
          <Fragment>
            <button
              onClick={() => {
                setColumns(
                  columns.filter((_column) => {
                    return _column.accessor != column.accessor
                  })
                )
              }}
            >
              Remove
            </button>
            <button
              onClick={() => {
                setOrderBy({
                  [column.accessor]: 'asc',
                })
              }}
            >
              Sort A-Z
              {JSON.stringify(orderBy) ==
                JSON.stringify({ [column.accessor]: 'asc' }) && (
                <Fragment>*</Fragment>
              )}
            </button>
            <button
              onClick={() => {
                setOrderBy({
                  [column.accessor]: 'desc',
                })
              }}
            >
              Sort Z-A
              {JSON.stringify(orderBy) ==
                JSON.stringify({ [column.accessor]: 'desc' }) && (
                <Fragment>*</Fragment>
              )}
            </button>
          </Fragment>
        )}
      </td>
    )
  })
  let tableRows = (rows) => {
    let _rows = rows.map((row) => {
      row.actions = (
        <button value={row.id} onClick={handleRemoveItem}>
          Remove
        </button>
      )
      let _elements = columns.map((column) => {
        return (
          <td
            className={row.id + '_' + column.accessor}
            key={row.id + '_' + column.accessor}
          >
            {row[column.accessor]}
          </td>
        )
      })
      return (
        <tr className={row.id + '_row'} key={row.id}>
          {_elements}
        </tr>
      )
    })
    return <tbody>{_rows}</tbody>
  }
  return (
    <Fragment>
      <input onChange={handleSearchInput} />
      <button onClick={handleSearchButton}>Go</button>
      <select onChange={handleTakeInput}>
        <option value={take}>{take}</option>
        {take != 10 && <option value="10">10</option>}
        {take != 20 && <option value="20">20</option>}
        {take != 50 && <option value="50">50</option>}
        {take != 100 && <option value="100">100</option>}
      </select>
      <table>
        <thead>
          <tr>{tableColumns}</tr>
        </thead>
        {tableRows(data.results)}
      </table>
      <button
        onClick={() => {
          setColumns([
            { accessor: 'id', Header: 'ID' },
            { accessor: 'name', Header: 'Name' },
            { accessor: 'eamil', Header: 'Email' },
            { accessor: 'actions', Header: 'Actions' },
          ])
        }}
      >
        Reset Columns
      </button>
      <button
        onClick={() => {
          setSkip(skip - 10)
        }}
      >
        Prev Page
      </button>
      <button
        onClick={() => {
          setSkip(skip + 10)
        }}
      >
        Next Page
      </button>
    </Fragment>
  )
}

/**
 *
 *
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  let title = 'Users'
  let table = 'user'
  const [searchInput, setSearchInput] = useState(params.get('filter'))
  let [columns, setColumns] = useState([
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Group Memberships',
      accessor: 'groupMemberships',
    },
    {
      Header: 'Preferences',
      accessor: 'Preference.length',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ])
  let data = React.useMemo(
    ()=> users.results.map((user) => {
      let memberships = user.GroupMember.map((membership) => {
        return (
          <Fragment key={membership.id} >
            <Link
              className="block"
              alt={`Link to ${membership.group.name}`}
              title={`Link to ${membership.group.name}`}
              key={membership.id}
              to={routes.group({ id: membership.group.id })}
            >
              {membership.group.name}
            </Link>
            </Fragment>
            )
          })
          //q: JSON.stringify({ AND: [JSON.parse(st)] }),
          let name = (
            <Fragment>
              <Link title={user.name} to={routes.user({ id: user.id })}>
                {user.name}
              </Link>
            </Fragment>
          )
          return {
            ...user,
            name,
            groupMemberships: memberships || <Fragment> 0 </Fragment>,
          }
        }),
        [
          searchInput
        ]
      )
      let queries = {
        QUERY: QUERY,
        DELETEMUTATION: DELETE_USER_MUTATION,
      }
      let recordRoutes = {
        editRecord: (prop) => {
          return routes.user(prop)
        },
        createRecord: () => {
          return routes.newUser()
        },
        readRecords: (props) => {
          return routes.users(props)
        },
      }
      let display = 'id'
      let roles = {
        createRecord: ['userCreate'],
        updateRecord: ['userUpdate'],
        readRecord: ['userRead'],
        deleteRecord: ['userDelete'],
      }
      let queryVariables = {}
      return (
        <Fragment>
          <MetaTags
            title="Users"
            description="All users"
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
            count={users.count}
            skip={users.skip}
            take={users.take}
            q={users.q}
            table={table}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </Fragment>
      )
 */
