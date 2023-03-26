import { Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { useAuth } from 'src/auth'
import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { readManyGQL, tableNames, getSchema, getRecords } from 'src/lib/atomicFunctions';
// we need to get the data from the server
//key={field.name} field={field} register={register}
const ReferenceField2 = ({field, register, record}) => {
  const { getToken } = useAuth()
  let [schema, setSchema] = useState()
  let [value, setValue] = useState()
  let [searchTerm, setSearchTerm] = useState()
  let [options, setOptions] = useState([])
  useEffect(() => {
    console.log('ReferenceField2 mounted')
    console.log({record})
    // lets build the gql query
    let { singularTable, pascalTable, pluralTable } = tableNames({ table: field.definition.table })
    let schema = getSchema({ table: pascalTable })
      .then(async (database) => {
        setSchema(database.schema)
        let query = readManyGQL({ table: singularTable, schema: database.schema })
        console.log(query)
        let variables = { take: 10, skip: 0 }
        if(searchTerm) {
          // if searchTerm is set, we need to filter the results for prisma
          variables.filter = `{${field.definition.display}: { contains: "${searchTerm}" }}`
        }
        getRecords({ table: pluralTable, schema: database.schema, token: await getToken(), variables: { take: 10, skip: 0} })
          .then((data) => {
            console.log(data)
            setOptions(data.data[pluralTable].results.map((row) => {
              return {
                value: row.cuid,
                label: row[field.definition.display],
                color: "#FF8B00"
                }
                }))
          })
      })

    return () => {
      console.log('ReferenceField2 unmounted')
    }
  }, [field,searchTerm])
  return (
    <Flex pt={field.pt}>
      <FormControl key={field.name}>
        <FormLabel htmlFor={field.name}>
        <details>
        <summary>field</summary>
        <pre>{JSON.stringify(field, null, 2)}</pre>
      </details>
          <Flex>
            <Text>{field?.definition?.label || field?.prettyName || field?.name}</Text>
          </Flex>
          <AsyncSelect
        name="colors"
        //defaultValue={[colorOptions[0]]}
        //TODO: FIX DEFAULT VALUE TO BE THE VALUE OF THE RECORD
        defaultValue={[{value: '', label: 'name'}]}
        options={[...options]}
        placeholder="Select a color"
        closeMenuOnSelect={true}
        size="md"
        loadOptions={(inputValue, callback) => {
          console.log('options', options)
          console.log('loadOptions')
          console.log(inputValue)
          setSearchTerm(inputValue)
            const values = options.filter((i) =>
              i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            callback(values);
        }}
        {...register(field.name)}
        />
        </FormLabel>
      </FormControl>
    </Flex>
  )
}

export default ReferenceField2
