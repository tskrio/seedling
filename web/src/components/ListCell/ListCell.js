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
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import { EditIcon, QuestionIcon } from '@chakra-ui/icons'
import { tableNames } from 'src/lib/atomicFunctions'
import ModalEditRow from '../ListRow/ModalEditRow'
import FormCell from 'src/components/FormCell'
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
  const { isOpen, onOpen, onClose } = useDisclosure()
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
        <ListHeader
          table={data.table}
          count={data.results.length}
          total={data.total}
        />
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
                bg={'white'}
              >
              <Flex gap={1}>
              <Box>
              <IconButton
            colorScheme="blue"
            icon={<EditIcon />}
            onClick={onOpen}
          />
          <ModalEditRow
            isOpen={isOpen}
            onClose={onClose}
            title={`Edit ${data.table}`}
          >
            <FormCell table={data.table} cuid={record.cuid} />
          </ModalEditRow>
              </Box>

                {data.fields.map((field) => {
                  let value = record[field.name]?.name || record[field.name]
                  if (field.type === 'DateTime') value = new Date(value).toLocaleString()
// return a box on a new line for each field
                  return (
                    <Box
                      key={`${cardKey}-${field.name}`}
                      fontFamily={'monospace'}
                      dipaly={'block'}
                      whiteSpace={'pre-wrap'}
                    >
                      {field.name}: {value}
                    </Box>
                  )
                })}
                </Flex>
              </Box>

            )
          })}
        </SimpleGrid>
        <ListRowFooter total={data.total} />
      </Box>
    </Box>
  )
}
