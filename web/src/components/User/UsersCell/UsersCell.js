import { routes, useLocation } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import {
  SimpleGrid,
  Flex,
  Table,
  TableCaption,
  Heading,
} from '@chakra-ui/react'
import TableColumns from 'src/components/TableColumns'
import TableQuery from 'src/components/TableQuery'
import TablePagination from 'src/components/TablePagination'

import TableRows from 'src/components/TableRows/TableRows'
import { initialColumns } from 'src/pages/User/UsersPage'
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
  return (
    <Fragment>
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
        setSkip={setSkip}
      />
      <Table variant="striped" colorScheme="teal" size="xs">
        <TableCaption>List of Users</TableCaption>

        <TableColumns
          columns={columns}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setColumns={setColumns}
          initialColumns={initialColumns}
          setTake={setTake}
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
      <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
        <Flex padding="10px"></Flex>
        <Flex padding="10px">
          <TablePagination skip={skip} setSkip={setSkip} take={take} />
        </Flex>
      </SimpleGrid>
    </Fragment>
  )
}
