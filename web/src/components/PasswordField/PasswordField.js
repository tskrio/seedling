import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

const PasswordField = ({ field, errors, register }) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <FormControl
      key={field.name}
      pt={field.pt}
      isInvalid={errors?.[field.name]}
    >
      <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
      <InputGroup size="md">
        <Input
          id={field.name}
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          defaultValue={field.defaultValue}
          placeholder={field.placeholder || 'Enter password'}
          disabled={field?.disabled}
          {...register(field.name, {
            //            required: field?.required || false,
            //            minLength: field.minLength,
          })}
        />
        <InputRightElement width="4.5rem">
          <Button
            rounded={'full'}
            h="1.75rem"
            size="sm"
            onClick={handleClick}
            color={'white'}
            backgroundColor={'green'}
          >
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>
        {errors?.[field.name] && errors?.[field.name].message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default PasswordField
