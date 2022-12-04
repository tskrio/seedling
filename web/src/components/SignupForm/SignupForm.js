import { useEffect, useState, Fragment } from 'react'

import {
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
const SignupForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const { isAuthenticated, signUp } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])
  const onSubmit = async (data) => {
    setSubmitted(true)
    const response = await signUp({ ...data })
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Account Created')
    }
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  let fields = [
    {
      name: 'name',
      prettyName: 'Name',
      placeholder: 'Deckard Cain',
      required: 'This is required',
    },
    {
      name: 'username',
      prettyName: 'Username',
      placeholder: 'deckard.cain',
      required: 'This is required',
    },
    {
      name: 'email',
      prettyName: 'Email (not required, used for password resets*)',
      placeholder: 'deckard.cain@example.com',
    },

    {
      name: 'password',
      prettyName: 'Password',
      required: 'This is required',
      type: 'password',
    },
  ]
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
              Create an account to login
            </Heading>
            <FormComponent
              fields={fields}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              formState={{ errors, isSubmitting }}
            >
              <Button
                mt={4}
                w={'100%'}
                backgroundColor={'green'}
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                isLoading={isSubmitting}
                type="submit"
              >
                Create Your Account
              </Button>
            </FormComponent>
          </Fragment>
        )}
        {submitted && (
          <Fragment>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Creating your account!
            </Heading>
          </Fragment>
        )}
      </Stack>
    </Flex>
  )
}

export default SignupForm
