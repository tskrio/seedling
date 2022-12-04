import { Fragment } from 'react'

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
  Spacer,
  Flex,
  Switch,
} from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'

import PasswordField from '../PasswordField/PasswordField'
import ReferenceField from '../ReferenceField/ReferenceField'
const FormComponent = ({
  record,
  fields,
  error,
  roles,
  onSubmit,
  onDelete,
  handleSubmit,
  register,
  formState: { errors, isSubmitting },
  children,
}) => {
  const { hasRole /*currentUser*/ } = useAuth()
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
          placeholder={field.placeholder || '...' || ''}
          readOnly={field.readOnly || false}
          {...register(field.name, {
            required: field?.required || false,
            minLength: field.minLength,
            onChange: field?.onChange,
          })}
          defaultValue={record?.[field.name] || field.defaultValue}
        />
        <FormErrorMessage>
          {errors[field.name] && errors[field.name].message}
        </FormErrorMessage>
      </FormControl>
    )
    if (field.type === 'boolean') {
      html = (
        <FormControl
          pt={field.pt}
          key={field.name}
          isInvalid={errors[field.name]}
          display="flex"
          alignItems="center"
        >
          <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
          <Switch
            colorScheme="green"
            id={field.name}
            readOnly={field.readOnly || false}
            {...register(field.name, {
              required: field?.required || false,
            })}
            defaultChecked={record?.[field.name] || field.defaultValue}
            //isChecked={record?.[field.name] || field.defaultValue}
          />
          <FormErrorMessage>
            {errors[field.name] && errors[field.name].message}
          </FormErrorMessage>
        </FormControl>
      )
    }
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
      } catch (error) {
        console.error(error)
      }
    }
    if (field.type === 'dateTime') {
      //Original(2022-03-10T16:41:06.000Z)
      //Displayed(2022-03-10T10:41)
      let transformedDefault = false
      let padToTwo = (value) => {
        if (typeof value !== 'string') value = value.toString()
        if (value.length === 2) return value
        return value.padStart(2, 0)
      }
      if (record?.[field.name] || field.defaultValue) {
        let fieldDate = new Date(record?.[field.name] || field.defaultValue)
        transformedDefault = `${fieldDate.getFullYear()}-${padToTwo(
          fieldDate.getMonth() + 1
        )}-${padToTwo(fieldDate.getDate())}T${padToTwo(
          fieldDate.getHours()
        )}:${padToTwo(fieldDate.getMinutes())}`
      }
      html = (
        <FormControl
          pt={field.pt}
          key={field.name}
          isInvalid={errors[field.name]}
        >
          <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
          <Input
            id={field.name}
            placeholder={field.placeholder || '...' || ''}
            readOnly={field.readOnly || false}
            type={'datetime-local'}
            {...register(field.name, {
              required: field?.required || false,
              minLength: field.minLength,
              onChange: field?.onChange,
            })}
            defaultValue={transformedDefault}
          />
          <FormErrorMessage>
            {errors[field.name] && errors[field.name].message}
          </FormErrorMessage>
        </FormControl>
      )
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
              <Fragment>
                <Flex>
                  <Button
                    mt={4}
                    colorScheme="green"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Spacer />
                  {hasRole([roles.deleteRecord].concat(['admin'])) && (
                    <Button
                      mt={4}
                      colorScheme="red"
                      isLoading={isSubmitting}
                      type="button"
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                  )}
                </Flex>
              </Fragment>
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
