import { useEffect, useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import { getSchema, readGQL, getRecord, tableNames } from 'src/lib/atomicFunctions'
import { useAuth } from 'src/auth'
import FormComponent from 'src/components/FormComponent/FormComponent'


const FormPage = ({ table, cuid }) => {
  const { getToken } = useAuth()
  let { pascalTable, pluralTable, singularTable } = tableNames({ table })
  let [schema, setSchema] = useState()
  let [formData, setFormData] = useState({})
  let [formState, setFormState] = useState('loading')
  let [error, setError] = useState()
  // first i need to get the schema for the table

  // then i need to build the form based on the schema
  // then i need to populate the form with the data
  useEffect(() => {
    setError(null)
    setFormState('loading')
    getSchema({ table: pascalTable, form: true })
      .then(async (database) => {
        setSchema(database.schema)
        let token = await getToken()
        let buildQuery = readGQL({ table: singularTable, data: database })
        if(cuid){
          let result = await getRecord({ query: buildQuery, cuid, token })
          if(result?.data?.[singularTable]){
            setFormState('loaded')
            setFormData(result.data[singularTable])
          } else {
            setError('Record not found')
            setFormState('notFound')
          }
        }
        if(!cuid) {
          setFormState('loaded')
        }
      })
  }, [table, cuid])


  //TODO: Get submit to work
  //TODO: Get New to work
  //TODO: Get Delete to work
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const roles = {
    update: ['groupMemberUpdate'],
    delete: ['groupMemberDelete'],
  }
  const onSubmit = (data) => {
    console.log({ function: 'onSubmit', formData })
    console.log('onSubmit', data)
  }
  return (
    <>
      <MetaTags title="Form" description="Form page" />

      {schema && formState == 'loaded' && (
        <FormComponent
          record={formData}
          fields={schema.fields}
          roles={roles}
          onSubmit={onSubmit}
          onDelete={(data) => {
            console.log('onDelete', data)
          }}
          returnLink={routes.list({ table: pluralTable })}
          handleSubmit={handleSubmit}
          register={register}
          formState={{ errors, isSubmitting }}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {formState == 'loading' && (
        <p>Loading...</p>
      )}
      {error && (
        <p>ERROR: {error}</p>
      )}
    </>
  )
}

export default FormPage
