import { Fragment, useEffect, useState } from 'react'

import {
  Flex,
  Table,
  TableCaption,
  Heading,
  Button,
  Box,
  Spacer,
  useMediaQuery,
  Center,
} from '@chakra-ui/react'
import { MdAdd, MdKeyboardBackspace } from 'react-icons/md'

import { navigate, routes, useLocation } from '@redwoodjs/router'

import TableColumns from 'src/components/TableColumns'
import TablePagination from 'src/components/TablePagination'
import TableQuery from 'src/components/TableQuery'
import TableRows from 'src/components/TableRows/TableRows'
import TableSkeleton from 'src/components/TableSkeleton/TableSkeleton'
import { DELETE_USER_MUTATION } from 'src/components/User/EditUserCell'

export const beforeQuery = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search } = useLocation()
  let params = new URLSearchParams(search)
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
// Looks like you have some foreign keys
// [] you may want to update the query
// below to include the related values
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
        name
        #GroupMember @include(if: $canSeeGroupMembers) {
        #GroupMember {
        #  id
        #}
        Preference {
          id
        }
      }
    }
  }
`

export const Loading = () => <TableSkeleton />

export const Failure = ({ error }) => (
  <div className="rw-cell-error">...{error.message}</div>
)

export const Success = ({
  users,
  fuzzyQuery,
  setFuzzyQuery,
  query,
  setQuery,
  columns,
  initialColumns,
  setColumns,
  orderBy,
  setOrderBy,
  skip,
  setSkip,
  take,
  setTake,
  displayColumn,
  roles,
}) => {
  let [data, setData] = useState(users)
  const [isSmallScreen] = useMediaQuery(`(max-width: ${950}px)`)
  // if small screen remove inner array from columns and data.
  let returnFirstAndLast = (arrayOfThings) => {
    let { 0: a, [arrayOfThings.length - 1]: b } = arrayOfThings
    return [a, b]
  }
  useEffect(() => {
    if (isSmallScreen) setColumns(returnFirstAndLast(columns))
    if (!isSmallScreen) setColumns(initialColumns)
  }, [isSmallScreen, setColumns, initialColumns, columns])
  return (
    <Fragment>
      <Heading pb={2}>Users ({data.count})</Heading>
      <Flex>
        <Box>
          {users.q !== null && (
            <Button
              leftIcon={<MdKeyboardBackspace />}
              colorScheme={'green'}
              variant="solid"
              onClick={() => {
                setQuery('')
                setFuzzyQuery('')
                navigate(routes.users({}))
              }}
            >
              All users
            </Button>
          )}
        </Box>
        <Spacer />
        <Button
          leftIcon={<MdAdd />}
          colorScheme={'green'}
          variant="solid"
          onClick={() => {
            navigate(routes.newUser())
          }}
        >
          New user
        </Button>
      </Flex>
      <TableQuery
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        rawQuery={users.q}
        inputPlaceholder="Search"
        link={(query) => {
          return routes.users({ q: query })
        }}
        setSkip={setSkip}
      />
      <Table variant="striped" colorScheme={'green'} size="xs">
        <TableCaption>List of Users</TableCaption>

        <TableColumns
          columns={columns}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setColumns={setColumns}
          initialColumns={initialColumns}
          setTake={setTake}
        />

        <TableRows
          columns={columns}
          roles={roles}
          setData={setData}
          data={data}
          model="users"
          deleteMutation={DELETE_USER_MUTATION}
          displayColumn={displayColumn}
        />
      </Table>
      <Center>
        <TablePagination
          count={data.count}
          skip={skip}
          setSkip={setSkip}
          take={take}
        />
      </Center>
    </Fragment>
  )
}
