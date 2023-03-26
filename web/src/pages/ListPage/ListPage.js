//import { Link, routes } from '@redwoodjs/router'
import { Fragment, useEffect, useState } from 'react'
import {
  //SimpleGrid,
  Table,
  TableCaption,
  Heading,
  Th,
  Tr,
  Thead,
  Td,
  Tbody,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react'
import { MdSortByAlpha } from 'react-icons/md'
import camelCase from 'camelcase'
import { getRecords, getSchema, readManyGQL } from 'src/lib/atomicFunctions'
import { useAuth } from 'src/auth'
import { MetaTags } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { tableNames } from 'src/lib/atomicFunctions'

let transformData = ({ data, schema }) => {
  // look at the schema and if the type is DateTime
  // convert it to a date
  //console.log('transformData', { data })
  schema.fields.forEach((field) => {
    if (field.type === 'DateTime') {
      data.forEach((row) => {
        let value = row[field.name]
        if (!value) row[field.name] = ''
        if (value) row[field.name] = new Date(value).toLocaleString()
      })
    }
  })
  return data
}
const ListPage = ({ table }) => {
  const { getToken } = useAuth()
  let { camelTable, pascalTable, pluralTable, spacedTable } = tableNames({ table })
  let [schema, setSchema] = useState()
  let [rows, setRows] = useState()
  let [count, setCount] = useState(0)
  let [listState, setListState] = useState('loading')
  let [error, setError] = useState()
  useEffect(() => {
    setError(null)
    setRows([])//clear the rows when the table changes
    setCount(0)//clear the count when the table changes
    setListState('loading')//clear the listState when the table changes
    getSchema({ table: pascalTable })
      .then(async (database) => {
        // filter the schema to only include the table
        setSchema(database.schema)
        //console.log('database.schema', database.schema)
        let token = await getToken()
        getRecords({ table: camelTable, schema: database.schema, token }).then(
          (data) => {
            if(data.errors){
              setListState('error')
              setError(data.errors)
              return
            }
            let results = data.data[pluralTable].results
            transformData({ data: results, schema: database.schema })
            setCount(results.length)
            setRows(results)
            setListState('loaded')
          }
        )
      })
      .catch((error) => {
        setError(error.message)
        console.error('error', error)
      })
  }, [table])

  if(listState === 'error'){
    return <p>ERROR: {JSON.stringify(error)}</p>
  }
  if(listState === 'loading'){
    return <p>Loading...</p>
  }
  return (
    <Fragment>
      <MetaTags title="List" description="List page" />

      <Heading pb={2}>
        {spacedTable} ({count})
      </Heading>
      {error && <p>ERROR: {JSON.stringify(error)}</p>}
      {!error && !schema && <p>Loading...</p>}
      {!error && schema && !rows && <p>Loading...</p>}
      {!error && schema && rows && (
        <Table key={'table'} variant="striped" colorScheme={'green'} size="xs">
          <TableCaption key={'tc'}>List of {table}</TableCaption>
          <Thead key={'thead'}>
            <Tr key={`${table}.heading`}>
              {schema &&
                schema.fields &&
                schema.fields.map((field, index) => {
                  let header = field?.definition?.label || field.name
                  let sortable = field?.definition?.canSort
                  return <Th key={`${table}.${field.name}`}>
                    {header}
                    {sortable && <Icon as={MdSortByAlpha} />}
                  </Th>
                })}
            </Tr>
          </Thead>
          <Tbody key={'tbody'}>
            {rows &&
              rows.map((row, rowIndex) => {
                return (
                  <Tr key={row.cuid}>
                    {schema &&
                      schema.fields &&
                      schema.fields.map((field, fieldIndex) => {
                        let key = `${table}.${field.name}.${row.cuid}`
                        let font = field?.definition?.fontFamily
                        let reference = field?.reference && field?.definition?.display && field?.definition?.value
                        let referenceCuid = row?.[field.name]?.[field.definition.value]
                        let genericFormLink = routes.formEdit({ table: camelTable, cuid: row.cuid })
                        if( fieldIndex === 0) {
                          return (<Td key={key}>
                            {/*<ChakraLink as={Link} to={routes[camelTable]({cuid: row.cuid})} fontFamily={font}>
                              {row[field.name]}
                            </ChakraLink>*/}
                            <ChakraLink as={Link} to={genericFormLink} fontFamily={font}>
                              {row[field.name]}
                            </ChakraLink>
                          </Td>)
                        }
                        if (reference && referenceCuid ) {
                          let referenceTable = camelCase(field.name, { pascalCase: false })
                          return (<Td key={key}>
                              <ChakraLink as={Link} to={routes[referenceTable]({cuid: referenceCuid})} fontFamily={font}>
                              {row[field.name][field.definition.display]}
                              </ChakraLink>
                          </Td>)
                        }
                        return <Td key={key}>{row[field.name]}</Td>
                      })}
                  </Tr>
                )
              })}
          </Tbody>
          {/*
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
          model="groups"
          deleteMutation={DELETE_GROUP_MUTATION}
          displayColumn={displayColumn}
        />
              */}
        </Table>
      )}
      {/*
      <Center>
        <TablePagination
          count={data.count}
          skip={skip}
          setSkip={setSkip}
          take={take}
        />
      </Center>
*/}
      <pre>{JSON.stringify(schema, null, ' ')}</pre>
    </Fragment>
  )
}

export default ListPage
