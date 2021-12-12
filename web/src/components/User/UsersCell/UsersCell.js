import { Link, routes, useLocation } from '@redwoodjs/router'
import { Fragment, useState /* useEffect, useRef */ } from 'react'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import {
  Select,
  //Box,
  Button,
  Table,
  Thead,
  Tbody,
  //Tfoot,
  Td,
  TableCaption,
  IconButton,
  Heading,
} from '@chakra-ui/react'
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import TableColumns from 'src/components/TableColumns'
import TableQuery from 'src/components/TableQuery'
//import { MetaTags } from '@redwoodjs/web'
//import TableComponent from 'src/components/TableComponent'
const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`
export const beforeQuery = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  //console.log(props)
  return {
    variables: {
      q: params.get('q'),
      filter: props.fuzzyQuery || params.get('filter'),
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
  return <Fragment>{'No users yet. '}</Fragment>
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  users,
  fuzzyQuery,
  setFuzzyQuery,
  query,
  setQuery,
  columns,
  setColumns,
  orderBy,
  setOrderBy,
  skip,
  setSkip,
  take,
  setTake,
}) => {
  const { hasRole /*currentUser*/ } = useAuth()
  let [data, setData] = useState(users)
  let handleTakeInput = (event) => {
    console.log(event.target.value)
    setTake(parseInt(event.target.value, 10))
  }
  let handleRemoveItem = (event) => {
    console.log(event)
    let id = parseInt(event.target.value, 10)
    console.log(data.results)
    let foundUser = data.results.filter((user) => {
      return user.id === id
    })

    if (confirm(`Are you sure you want to delete ${foundUser[0].name}?`)) {
      deleteRecord({ variables: { id } })
    }
    setData({
      ...users,
      results: data.results.filter((user) => {
        return !(user.id === id)
      }),
    })
    return false
  }

  const [deleteRecord] = useMutation(DELETE_USER_MUTATION, {
    onError: (error) => {
      toast.error(error.message || `Error - not deleted`)
    },
    onCompleted: (del) => {
      toast.success(`Deleted ${del.deleteUser.name}`)
    },
  })
  let tableRows = (rows) => {
    let _rows = rows.map((row) => {
      if (hasRole(['userDelete', 'userEdit', 'admin'])) {
        row.actions = (
          <Button
            value={row.id}
            onClick={handleRemoveItem}
            leftIcon={<CloseIcon />}
            colorScheme="red"
            variant="solid"
            type="button"
            size="xs"
          >
            Remove
          </Button>
        )
      }
      let _elements = columns.map((column) => {
        let key = `${row.id}_${column.accessor}`

        if (column.scripted) {
          let _value = row[column.accessor]
          let nestedElements = _value.map((relatedRecord) => {
            return relatedRecord?.group?.name
          })
          return <Td key={key}>{nestedElements}</Td>
        } else if (column.link) {
          return (
            <Td key={key}>
              <Link title={row.name} to={routes.user({ id: row.id })}>
                {row[column.accessor]}
              </Link>
            </Td>
          )
        } else {
          return <Td key={key}>{row[column.accessor]}</Td>
        }
      })
      return (
        <tr className={`${row.id}_row`} key={row.id}>
          {_elements}
        </tr>
      )
    })
    return <Tbody>{_rows}</Tbody>
  }
  return (
    <Fragment>
      <Heading>Users ({users.count})</Heading>
      <TableQuery
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        rawQuery={users.q}
      />
      <Select onChange={handleTakeInput}>
        <option value={take}>{take}</option>
        {take != 10 && <option value="10">10</option>}
        {take != 20 && <option value="20">20</option>}
        {take != 50 && <option value="50">50</option>}
        {take != 100 && <option value="100">100</option>}
      </Select>
      <Table variant="striped" colorScheme="teal" size="xs">
        <TableCaption>List of Users</TableCaption>

        <Thead>
          {/*<Tr>{tableColumns}</Tr>*/}
          <TableColumns
            columns={columns}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            setColumns={setColumns}
          />
        </Thead>
        {tableRows(data.results)}
      </Table>
      <button
        onClick={() => {
          setColumns([
            { accessor: 'id', Header: 'ID' },
            { accessor: 'name', Header: 'Name' },
            { accessor: 'email', Header: 'Email' },

            {
              Header: 'GroupMember',
              accessor: 'GroupMember',
              canSort: false,
              scripted: true,
            },
            { accessor: 'actions', Header: 'Actions', canSort: false },
          ])
        }}
      >
        Reset Columns
      </button>
      <IconButton
        onClick={() => {
          setSkip(skip - 10)
        }}
        aria-label="Previous Page"
        icon={<ChevronLeftIcon />}
      />

      <IconButton
        onClick={() => {
          setSkip(skip + 10)
        }}
        aria-label="Next Page"
        icon={<ChevronRightIcon />}
      />
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
