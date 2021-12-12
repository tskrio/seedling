import { Link, routes, useLocation } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import {
  Select,
  Button,
  Table,
  Tbody,
  Td,
  TableCaption,
  Heading,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import TableColumns from 'src/components/TableColumns'
import TableQuery from 'src/components/TableQuery'
import TablePagination from 'src/components/TablePagination'
import { MetaTags } from '@redwoodjs/web'
import TableRows from 'src/components/TableRows/TableRows'
const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deletedRow: deleteUser(id: $id) {
      id
      name
    }
  }
`
export const beforeQuery = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search, pathname } = useLocation()
  let params = new URLSearchParams(search)

  if (pathname !== '/users') return
  return {
    variables: {
      q: params.get('q'),
      filter: params.get('filter') || props.fuzzyQuery,
      skip: params.get('skip') || props.skip || 0,
      take: params.get('take') || props.take || 10,
      orderBy: params.get('orderBy') || props.orderBy,
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
  deleteRoles,
}) => {
  let [data, setData] = useState(users)
  let handleTakeInput = (event) => {
    console.log(event.target.value)
    setTake(parseInt(event.target.value, 10))
  }
  return (
    <Fragment>
      <MetaTags />
      <Heading>Users ({data.count})</Heading>
      <TableQuery
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        rawQuery={users.q}
        inputPlaceholder="Search id, name and email"
        link={(query) => {
          return routes.users({ q: query })
        }}
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

        <TableColumns
          columns={columns}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setColumns={setColumns}
        />
        {/*{tableRows(data.results)}*/}
        <TableRows
          columns={columns}
          deleteRoles={deleteRoles}
          setData={setData}
          data={data}
          deleteMutation={DELETE_USER_MUTATION}
          displayColumn="name"
        />
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

      <TablePagination skip={skip} setSkip={setSkip} />
    </Fragment>
  )
}
