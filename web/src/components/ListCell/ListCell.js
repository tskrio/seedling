import {
  Tr,
  Td,
  Box,
  Center,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Flex,
  Spacer,
} from '@chakra-ui/react'

import { tableNames } from 'src/lib/atomicFunctions'

import ListHeader from '../ListHeader/ListHeader'
import ListRow from '../ListRow/ListRow'
import ListRowFooter from '../ListRowFooter/ListRowFooter'
import ListRowHeader from '../ListRowHeader/ListRowHeader'
export let QUERY = gql`
  query FindRecords(
    $table: String!
    $page: Int
    $take: Int
    $where: String
    $orderBy: String
  ) {
    data: readRecords(
      table: $table
      page: $page
      take: $take
      where: $where
      orderBy: $orderBy
    ) {
      table
      page
      take
      where
      filter
      orderBy
      order
      fields
      select
      total
      results
    }
  }
`
export const beforeQuery = ({ table, page, take, where, orderBy }) => {
  let { camelTable, pascalTable, pluralTable, spacedTable, singularTable } =
    tableNames({ table: table })
  //console.log({ file: 'listcell.js', function: 'beforeQuery', table, page, take, where, orderBy, camelTable, pascalTable, pluralTable, spacedTable, singularTable })
  let output = {
    variables: {
      table: pascalTable,
      page: parseInt(page),
      take: parseInt(take),
      where,
      orderBy,
    },
  }
  //console.log({ file: 'listcell.js', function: 'beforeQuery', output })
  return output
}
export const Loading = () => {
  return (
    <Box bg={'white'} m={2} rounded={'md'} p={2}>
      <Center>
        <Spinner size={'xl'} />
      </Center>
    </Box>
  )
}

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ data }) => {
  //console.log({ file: 'listcell.js', data })
  //return <div>SUCCESS???<Box fontFamily={'monospace'} whiteSpace={'pre-wrap'}>{JSON.stringify(records, null, 2)}</Box></div>
  // lets loop over the data
  // we'll need to create a table and card
  // lets start with the card
  return (
    <Box>
      <details>
        <summary>Debug Data</summary>
        <Box fontFamily={'monospace'} whiteSpace={'pre-wrap'}>
          {JSON.stringify(data, null, 2)}
        </Box>
      </details>
      <Box
        bg={'white'}
        display={{ base: 'none', md: 'block', lg: 'block' }}
        m={2}
        rounded={'md'}
        p={2}
      >
        <ListHeader
          table={data.table}
          count={data.results.length}
          total={data.total}
        />
        <Table variant="striped" colorScheme="green">
          <ListRowHeader fields={data.fields} />
          <Tbody>
            {data.results.map((record) => {
              return (
                <ListRow
                  key={`listrow-${record.cuid}`}
                  record={record}
                  fields={data.fields}
                  table={data.table}
                />
              )
            })}
          </Tbody>
        </Table>
        <ListRowFooter total={data.total} />
      </Box>
      <Box display={{ base: 'block', md: 'none', lg: 'none' }}>
        <ListHeader table={data.table} count={data.results.length} />
        <SimpleGrid>
          {data.results.map((record) => {
            let cardKey = `card-${record.cuid}`
            return (
              <Box
                key={cardKey}
                m={2}
                border={'1px solid black'}
                rounded={'md'}
                p={2}
              >
                {Object.keys(record).map((key) => {
                  if (key !== 'cuid') {
                    let value = record[key]
                    if (value?.length > 20) {
                      value = value.substring(0, 17)
                      value += '...'
                    }
                    return (
                      <Box key={`${cardKey}-${key}`}>
                        {/*<Flex>
                            {key}
                            <Spacer />
                            <Box>
                              {value}
                            </Box>
                          </Flex>*/}
                        <Box border={'1px solid black'}></Box>
                      </Box>
                    )
                  }
                })}
              </Box>
            )
          })}
        </SimpleGrid>
        <ListRowFooter />
      </Box>
    </Box>
  )
}
