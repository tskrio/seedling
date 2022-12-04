import { useState, Fragment, useEffect } from 'react'

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

const ForgotPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [username, setUsername] = useState()
  const { forgotPassword } = useAuth()

  const onSubmit = async (data) => {
    setUsername(data.username)
    const response = await forgotPassword(data.username)
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('If email is verified on that account.')
    }
    setSubmitted(true)
  }
  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm()
  let fields = [
    {
      name: 'username',
      prettyName: 'Username',
      required: "Without this, we don't know who to email.",
    },
  ]
  useEffect(() => {
    setFocus('username')
  }, [setFocus])
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
                colorScheme={'green'}
                isLoading={isSubmitting}
                type="submit"
              >
                Request Reset
              </Button>
            </FormComponent>
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
                colorScheme={'green'}
                isLoading={isSubmitting}
                type="submit"
              >
                Resend email to {username}
              </Button>
            </form>
          </Fragment>
        )}
      </Stack>
    </Flex>
  )
}

export default ForgotPasswordForm
