import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState, Fragment } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useForm } from 'react-hook-form'
const ForgotPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState()
  const { forgotPassword } = useAuth()

  const onSubmit = async (data) => {
    setEmail(data.email)
    const response = await forgotPassword(data.email)
    toast.success('If the email is on file, an email has been sent.')
    // if (response.error) {
    //   toast.error(response.error)
    // } else {
    //   toast.success(
    //     'A link to reset your password was sent to ' + response.email
    //   )
    // }
    setSubmitted(true)
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  let field = {
    name: 'email',
    prettyName: 'Email to send the reset link to',
    required: false,
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        {submitted === false && (
          <Fragment>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Forgot your password?
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl key={field.name} isInvalid={errors[field.name]}>
                <FormLabel htmlFor={field.name}>{field.prettyName}</FormLabel>
                <Input
                  id={field.name}
                  placeholder={field.placeholder || ''}
                  {...register(field.name, {
                    required: field?.required || false,
                    minLength: field.minLength,
                  })}
                />
                <FormErrorMessage>
                  {errors[field.name] && errors[field.name].message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Request Reset
                </Button>
              </Stack>
            </form>
          </Fragment>
        )}
        {submitted && (
          <Fragment>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              You should have an email
            </Heading>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={() => {
                navigate(routes.login())
              }}
            >
              Go to Login Page
            </Button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button
                mt={4}
                w={'100%'}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Resend email to {email}
              </Button>
            </form>
          </Fragment>
        )}
      </Stack>
    </Flex>
  )
}

export default ForgotPasswordForm
