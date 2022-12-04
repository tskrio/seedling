import { useEffect } from 'react'

import {
  Button,
  Flex,
  Heading,
  Stack,
  Image,
  Box,
  Spacer,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { Toaster, toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
const LoginForm = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const onSubmit = async (data) => {
    const response = await logIn({ ...data })
    if (response.error) {
      toast.error(response.error)
    } else {
      navigate(routes.home())
    }
  }
  let fields = [
    {
      name: 'username',
      prettyName: 'Username',
      placeholder: 'your.username',
      required: 'This is required',
    },

    {
      name: 'password',
      prettyName: 'Password',
      required: 'This is required',
      type: 'password',
    },
  ]
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
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
              rounded={'full'}
              backgroundColor={'green'}
              color={'white'}
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </FormComponent>
          <Flex>
            <Box pl="4">
              <Button
                backgroundColor={'green.900'}
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                onClick={() => {
                  navigate(routes.forgotPassword())
                }}
              >
                Forgot Password
              </Button>
            </Box>
            <Spacer />
            <Box pr="4">
              <Button
                backgroundColor={'green.900'}
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                onClick={() => {
                  navigate(routes.signup())
                }}
              >
                Sign up
              </Button>
            </Box>
          </Flex>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'/laptop-g6c0e6e461_1920.webp'}
        />
      </Flex>
    </Stack>
  )
}

export default LoginForm
