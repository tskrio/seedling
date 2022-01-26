import { routes, useLocation } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import {
  SimpleGrid,
  Flex,
  Table,
  TableCaption,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react'
import TableColumns from 'src/components/TableColumns'
import TableQuery from 'src/components/TableQuery'
import TablePagination from 'src/components/TablePagination'
import TableRows from 'src/components/TableRows/TableRows'
import { DELETE_GROUP_MEMBER_MUTATION } from 'src/components/GroupMember/EditGroupMemberCell'

export const beforeQuery = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search, pathname } = useLocation()
  let params = new URLSearchParams(search)
  //if (pathname !== '/group-members') return
  //console.log('beforeQuery', props)
  return {
    variables: {
      q: params.get('q') || props.query,
      filter: params.get('filter') || props.fuzzyQuery,
      skip: params.get('skip') || props.skip || 0,
      take: params.get('take') || props.take || 10,
      orderBy: params.get('orderBy') || props.orderBy,
    },

    fetchPolicy: 'no-cache',
  }
}
// Looks like you have some foreign keys
// ["userId","groupId"] you may want to update the query
// below to include the related values
export const QUERY = gql`
  query FindGroupMembers(
    $filter: String
    $skip: Int
    $take: Int
    $q: String
    $orderBy: OrderByInput
  ) {
    groupMembers(
      filter: $filter
      skip: $skip
      take: $take
      q: $q
      orderBy: $orderBy
    ) {
      count
      take
      skip
      q
      results {
        id
        createdAt
        updatedAt
        userId
        user {
          id
          name
        }
        groupId
        group {
          id
          name
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
  groupMembers,
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
  let [data, setData] = useState(groupMembers)
  return (
    <Fragment>
      <Heading>GroupMembers ({data.count})</Heading>
      <Box style={{ display: 'none' }}>
        <Text>orderBy: {JSON.stringify(orderBy)?.toString()}</Text>
        <Text>query: {JSON.stringify(query)?.toString()}</Text>
        <Text>fuzzyQuery: {JSON.stringify(fuzzyQuery)?.toString()}</Text>
        <Text>take: {JSON.stringify(take)?.toString()}</Text>
        <Text>skip: {JSON.stringify(skip)?.toString()}</Text>
      </Box>
      <TableQuery
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        rawQuery={groupMembers.q}
        inputPlaceholder="Search"
        link={(query) => {
          return routes.groupMembers({ q: query })
        }}
        setSkip={setSkip}
      />

      <Table variant="striped" colorScheme={'green'} size="xs">
        <TableCaption>List of GroupMembers</TableCaption>

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
          model="groupMembers"
          deleteMutation={DELETE_GROUP_MEMBER_MUTATION}
          displayColumn={displayColumn}
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
