import FormCell from "../FormCell"
import { useAuth } from 'src/auth'
// chakra
import {Box, Heading, Text} from '@chakra-ui/react'
export const QUERY = gql`
  query FormDefinitionQuery($table: String!) {
    formDefintion: formDefinitionByTable(table: $table) {
      cuid,
      createdAt,
      updatedAt,
      table,
      title,
      content
    }
  }
`
export const BeforeQuery = () => {}

export const Loading = () => <div>Loading...</div>

export const Empty = ({table}) => {
  const { hasRole, isAuthenticated } = useAuth()
  let isAdmin = hasRole('admin')
  if (isAdmin && isAuthenticated) {
    return (<Box bg={'white'} p={2} rounded={'md'} shadow={'md'}>
      {/**show a red banner error telling me to create this */}
      <Heading as={'h3'} bg={'red.500'} color={'white'} p={2} rounded={'md'}>Form Definition Not Found</Heading>
      <Text>Form Definition for "{table}" not found. Create one?</Text>

      <FormCell table={'formDefinitions'} emptyTable={table} />
    </Box>)
  }
  return (<div>Could not find "{table}" to load</div>)
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ formDefintion, table, cuid }) => {
  // sometimes we dont have json but we expect it
  let parsedFormDefintion = {}
  try {
    parsedFormDefintion = JSON.parse(formDefintion.content)
  } catch (error) {
    console.log(error)
  }


  return (<Box>
    <details>
      <summary>formDefintion</summary>
      formDefintion: <pre>{JSON.stringify(formDefintion, null, 2)}</pre>
    parsedFormDefintion: <pre>{JSON.stringify(parsedFormDefintion, null, 2)}</pre>

    </details>
    <Box bg={'white'} p={2} rounded={'md'} shadow={'md'}>
    <Heading>{table}</Heading>
    {table && cuid && (<FormCell table={table} cuid={cuid} />)}
    {table && !cuid && (<FormCell table={table} />)}
    </Box>



  </Box>)
}