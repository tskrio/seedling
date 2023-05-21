import {
  Text,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from '@chakra-ui/react'
import camelCase from 'camelcase'
import pluralize from 'pluralize'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'

import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import AutoResizeTextarea from 'src/components/AutoResizeTextarea'
import Lookup from 'src/components/Lookup'
import LookupCell from 'src/components/LookupCell'
import { tableNames } from 'src/lib/atomicFunctions'
export const QUERY = gql`
  query FindRecord($table: String!, $cuid: String) {
    record: readRecord(table: $table, cuid: $cuid) {
      table
      cuid
      fields
      select
      result
    }
  }
`
let UPDATE_RECORD_MUTATION = gql`
  mutation UpdateRecordMutation($table: String!, $cuid: String!, $data: JSON!) {
    updateRecord(table: $table, cuid: $cuid, data: $data) {
      table
      cuid
      fields
      select
      result
    }
  }
`
let CREATE_RECORD_MUTATION = gql`
  mutation CreateRecordMutation($table: String!, $data: JSON!) {
    createRecord(table: $table, data: $data) {
      table
      cuid
      fields
      select
      result
    }
  }
`
let DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecordMutation($table: String!, $cuid: String!) {
    deleteRecord(table: $table, cuid: $cuid) {
      table
      cuid
      fields
      select
      result
    }
  }
`
export const beforeQuery = ({ table, cuid }) => {
  console.log({ file: 'formcell.js', function: 'beforeQuery', table, cuid })
  //let { pascalTable } = tableNames({ table })
  let camelTable = camelCase(table, { pascalCase: false })
  let pluralTable = pluralize(camelTable, 2)
  let singularTable = camelCase(pluralize(table, 1), { pascalCase: false })
  let pascalTable = camelCase(singularTable, { pascalCase: true })

  let output = {
    variables: {
      table: pascalTable,
      cuid: cuid,
    },
  }
  //console.log({ file: 'listcell.js', function: 'beforeQuery', output })
  return output
}

export const Loading = () => (
  <Center>
    <Spinner size={'xl'} />
  </Center>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>
    Error: {error?.message}{' '}
    {error?.graphQLErrors[0]?.extensions?.originalError?.message}
  </div>
)

export const Success = ({ record, onClose }) => {
  console.log({ file: 'formcell.js', function: 'Success', record, onClose })
  // Prep the form for submission
  const methods = useForm()
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = methods
  const [updateRecord, { loading, error }] = useMutation(
    UPDATE_RECORD_MUTATION,
    {
      onCompleted: () => {
        if (record.cuid) {
          toast.success('Record updated')
        }
        if (!record.cuid) {
          toast.success('Record created')
        }
        if(onClose) {
          onClose()
          window.location.reload()//TODO: this is a hack, fix it
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [createRecord, { loadingCreate, errorCreate }] = useMutation(
    CREATE_RECORD_MUTATION,
    {
      onCompleted: () => {
        if (record.cuid) {
          toast.success('Record updated')
        }
        if (!record.cuid) {
          toast.success('Record created')
        }
        if(onClose) {
          onClose()
          window.location.reload()//TODO: this is a hack, fix it
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [deleteRecord, { loadingDelete, errorDelete }] = useMutation(
    DELETE_RECORD_MUTATION,
    {
      onCompleted: () => {
        toast.success('Record deleted')
        if(onClose) {
          onClose()
          window.location.reload()//TODO: this is a hack, fix it
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    console.log({ function: 'onSubmit', data })
    onSave(data)
  }
  const onSave = (data) => {
    let isUpdate = record.cuid ? true : false
    let isCreate = record.cuid ? false : true
    // lts use getValues() instead of data
    let formValues = getValues()
    console.log({ function: 'onSave', data, isUpdate, isCreate })
    console.log({ function: 'onSave', formValues: getValues() })
    if (isUpdate) {
      updateRecord({
        variables: {
          table: record.table,
          cuid: record.cuid,
          data: formValues,
        },
      })
    }
    if (isCreate) {
      createRecord({
        variables: {
          table: record.table,
          data: data,
        },
      })
    }
  }

  // Parse the fields and sort them by order
  let fields = JSON.parse(JSON.stringify(record.fields))
  fields = fields.map((field) => {
    if (!field.definition.order) field.definition.order = 0
    return field
  })
  fields.sort((a, b) => {
    if (a.definition.order < b.definition.order) return -1
    if (a.definition.order > b.definition.order) return 1
    return 0
  })
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/*<form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit) }}>*/}
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <Box>
          <details>
            <summary>Debug Form Fields</summary>
            <pre>{JSON.stringify(record.fields, null, 2)}</pre>
          </details>
          <details>
            <summary>Debug Form Result</summary>
            <pre>{JSON.stringify(record.result, null, 2)}</pre>
          </details>
          <Box border={'1px solid black'} p={2} m={2} rounded={'md'}>
            <Text>Generally Hidden</Text>
            <FormControl>
              <FormLabel>Table</FormLabel>
              <Input readOnly={true} defaultValue={record.table} />
            </FormControl>
            <FormControl>
              <FormLabel>Cuid</FormLabel>
              <Input readOnly={true} defaultValue={record.cuid} />
            </FormControl>
          </Box>
          {record.fields.map((field, index) => {
            let fieldType = field?.definition?.type || 'text'

            // from lookup.js
            let [where, setWhere] = React.useState(null)
            let [query, setQuery] = React.useState(
              record?.result?.[field.type]?.[field.definition.display] || null
            )
            let [lookUpValue, setLookUpValue] = React.useState('')
            let setCuidField = (field, value) => {
              //console.log({ function: 'setCuidField', field, value })
              setValue(field, value)
            }
            let filterTimeout = null
            let handleInput = (e) => {
              let { value } = e.target
              setQuery(value)
              // we need to debounce this
              clearTimeout(filterTimeout)
              if (e.target.value === '') {
                setQuery('')
                setWhere(null)
                return
              }
              filterTimeout = setTimeout(() => {
                // we need a where object like so
                // where: { name: { contains: value, mode: 'insensitive' } }
                setWhere(`${field?.definition?.display}/contains/${value}`)
              }, 500)
            }
            /*

                          <Lookup
                            table={field?.type}
                            field={field?.definition?.display}
                            id={field.name}
                            //TODO: This does not work
                            defaultValue={record?.result?.[field.name] || field?.definition?.defaultValue || ''}
                          />
                          */
            // end from lookup.js

            return (
              <FormControl key={`formcell-${field.name}-${index}`}>
                <FormLabel>{field?.definition?.label || field.name}</FormLabel>
                {fieldType === 'text' && (
                  <Input
                    id={field.name}
                    {...register(field.name, {
                      required: field?.definition?.required || false,
                      maxLength: field?.definition?.maxLength || 255,
                      minLength: field?.definition?.minLength || 0,
                      onChange: field?.definition?.onChange || null,
                    })}
                    defaultValue={
                      record?.result?.[field.name] ||
                      field?.definition?.defaultValue ||
                      ''
                    }
                  />
                )}
                {fieldType === 'textarea' && (
                  <Box>
                  <details>
                    <summary>Debug Field</summary>
                    <pre>{JSON.stringify(field, null, 2)}</pre>
                  </details>
                  <AutoResizeTextarea
                    id={field.name}
                    {...register(field.name)}
                    defaultValue={
                      record?.result?.[field.name] ||
                      field?.definition?.defaultValue ||
                      ''
                    }
                  />
                  {/*
                  <Textarea
                    id={field.name}
                    {...register(field.name)}
                    defaultValue={
                      record?.result?.[field.name] ||
                      field?.definition?.defaultValue ||
                      ''
                    }
                  />*/}
                  </Box>
                )}
                {fieldType === 'code' && (
                  <AutoResizeTextarea
                    id={field.name}
                    fontFamily={'mono'}
                    {...register(field.name)}
                    defaultValue={
                      record?.result?.[field.name] ||
                      field?.definition?.defaultValue ||
                      ''
                    }
                  />
                )}
                {fieldType === 'reference' && (
                  <Box>
                    <Input
                      //id={field.definition.field}
                      //defaultValue={lookUpValue}
                      //readOnly={true}
                      display={'none'}
                      {...register(field.definition.field, {
                        required: field?.definition?.required || false,
                        maxLength: field?.definition?.maxLength || 255,
                        minLength: field?.definition?.minLength || 0,
                        onChange: field?.definition?.onChange || null,
                      })}
                    />
                    {lookUpValue}
                    <Input
                      value={query}
                      onChange={(e) => handleInput(e)}
                      placeholder="Search..."
                    />
                    <LookupCell
                      table={field.type}
                      where={where}
                      setLookUpValue={setLookUpValue}
                      setCuidField={setCuidField}
                      field={field.definition.field}
                      setQuery={setQuery}
                    />
                  </Box>
                )}
              </FormControl>
            )
          })}

          <Button
            mt={4}
            colorScheme="green"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
          <Button
            mt={4}
            colorScheme="red"
            isLoading={isSubmitting}
            onClick={() => {
              deleteRecord({
                variables: {
                  table: record.table,
                  cuid: record.cuid,
                },
              })
            }}
          >
            Delete
          </Button>

          {/** TODO: GET this to work for create*/}
        </Box>
      </form>
    </FormProvider>
  )
}
