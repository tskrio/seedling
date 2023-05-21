import { Box, Center, Button, Spinner, Text } from '@chakra-ui/react'

import { tableNames } from 'src/lib/atomicFunctions'
export const QUERY = gql`
  query FindRecordsForLookup(
    $table: String!
    $page: Int
    $take: Int
    $where: String
    $orderBy: String
  ) {
    result: readRecords(
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
export const beforeQuery = ({
  table,
  page,
  take,
  where,
  orderBy,
  setSearching,
}) => {
  console.log({
    file: 'listcell.js',
    function: 'beforeQuery',
    table,
    page,
    take,
    where,
    orderBy,
    setSearching,
  })
  let { camelTable, pascalTable, pluralTable, spacedTable, singularTable } =
    tableNames({ table })
  //console.log({ file: 'listcell.js', function: 'beforeQuery', table, page, take, where, orderBy, camelTable, pascalTable, pluralTable, spacedTable, singularTable })
  let output = {
    variables: {
      table: pascalTable,
      page: parseInt(page) || 1,
      take: parseInt(take) || 10,
      where,
      orderBy,
    },
  }
  //console.log({ file: 'listcell.js', function: 'beforeQuery', output })
  return output
}

export const Loading = () => {
  return (
    <Box>
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

export const Success = ({
  result,
  setLookUpValue,
  setQuery,
  field,
  setCuidField,
}) => {
  let [show, setShow] = React.useState(true)
  let setValue = (record) => {
    console.log(`setting field ${field} to ${record.cuid}`)
    setCuidField(field, record.cuid)
    setLookUpValue(record.cuid)
    setQuery(record.name)
    setShow(false)
  }
  if (!show) return <></>
  return result.results.map((record, index) => {
    return (
      <Box key={`lookup-${index}-${record.cuid}`}>
        <Button variant={'ghost'} onClick={() => setValue(record)}>
          {record.name}
        </Button>
      </Box>
    )
  })
}
