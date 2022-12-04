import { useEffect, useState, Fragment /*, useRef*/ } from 'react'

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
const ResetPasswordForm = ({ wait, resetToken }) => {
  const [submitted, setSubmitted] = useState(false)
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])
  // const passwordRef = useRef()
  // useEffect(() => {
  //   passwordRef.current.focus()
  // }, [])

  const onSubmit = async (data) => {
    setSubmitted(true)
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  let fields = [
    {
      name: 'password',
      prettyName: 'Password',
      required: 'This is required',
      type: 'password',
      disabled: !enabled,
      //ref: passwordRef,
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
              Reset Password
            </Heading>
            {wait && <>Waiting for code?</>}
            {!wait && (
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
                  Reset your password
                </Button>
              </FormComponent>
            )}
          </Fragment>
        )}
        {submitted && (
          <Fragment>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Redirecting you to login
            </Heading>
          </Fragment>
        )}
      </Stack>
    </Flex>
  )
}

export default ResetPasswordForm
