import {
  Input,
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react'

import { Fragment } from 'react'
import PasswordField from '../PasswordField/PasswordField'
import ReferenceField from '../ReferenceField/ReferenceField'
const FormComponent = ({
  record,
  fields,
  error,
  onSubmit,
  handleSubmit,
  register,
  formState: { errors, isSubmitting },
  children,
}) => {
  fields = fields.filter((field) => {
    if (!field.name) {
      console.error('Field missing name', field)
    }
    return field.name
  })
  let fieldNames = fields
    .map((field) => {
      return field.name
    })
    .sort()
  fieldNames.map((field, index) => {
    if (field === fieldNames[index - 1])
      throw `Multiple fields with name "${field}" are present`
  })
  let fieldsHtml = fields.map((field) => {
    field.pt = 2
    let html = (
      <FormControl
        pt={field.pt}
        key={field.name}
        isInvalid={errors[field.name]}
      >
        <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
        <Input
          id={field.name}
          placeholder={field.placeholder || ''}
          {...register(field.name, {
            required: field?.required || false,
            minLength: field.minLength,
          })}
          defaultValue={record?.[field.name] || field.defaultValue}
        />
        <FormErrorMessage>
          {errors[field.name] && errors[field.name].message}
        </FormErrorMessage>
      </FormControl>
    )
    if (field.type === 'password') {
      html = (
        <PasswordField
          key={field.name}
          field={field}
          errors={errors}
          register={register}
        />
      )
    }
    if (field.type === 'reference') {
      try {
        html = (
          <ReferenceField key={field.name} field={field} register={register} />
        )
      } catch (e) {
        console.log('error', e)
      }
    }
    if (field.type === 'select') {
      html = (
        <FormControl pt={2} key={field.name} isInvalid={errors[field.name]}>
          <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
          <Select
            defaultValue={record?.[field.name]}
            id={field.name}
            name={field.name}
            {...register(field.name, {
              required: field?.required || false,
              minLength: field.minLength,
            })}
          >
            <option>Pick one</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            {field.defaultOption}
            {field.options}
          </Select>
          <FormErrorMessage>
            {errors[field.name] && errors[field.name].message}
          </FormErrorMessage>
        </FormControl>
      )
    }
    if (field.type === 'json') {
      html = (
        <pre key={field.name}>
          {JSON.stringify(record?.[field.name], null, '  ')}
        </pre>
      )
    }
    return html
  })
  return (
    <Fragment>
      <Box bg={'white'} p={3}>
        {error?.graphQLErrors[0]?.message && (
          <Alert status="error">
            <AlertIcon />
            {error?.graphQLErrors[0]?.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {fieldsHtml}
          <Box>
            {!children ? ( // if children is passed, we don't want to show the submit button }
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            ) : (
              children
            )}
          </Box>
        </form>
      </Box>
    </Fragment>
  )
}

export default FormComponent
