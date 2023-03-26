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

import { navigate, routes } from '@redwoodjs/router'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import CookieModal from 'src/components/CookieModal'
import FormComponent from 'src/components/FormComponent'

const LoginPasswordLessTokenForm = ({ email, setWaitingForCode, code }) => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
    if (email && code) {
      logIn({ username: email, password: code })
    }
  }, [isAuthenticated, email, code, logIn])
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const onSubmit = async (data) => {
    const response = await logIn({ ...data })
    if (response.error) {
      toast.error(response.error)
      setWaitingForCode(false)
    } else {
      navigate(routes.home())
    }
  }
  let fields = [
    {
      name: 'username',
      prettyName: 'Email',
      placeholder: 'deckard.cain@example.com',
      required: 'This is required',
      defaultValue: email,
      readOnly: true,
      display: 'none',
    },

    {
      name: 'password',
      prettyName: 'Code',
      required: 'This is required',
      //type: 'password',
      placeholder: '123456',
    },
  ]
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <CookieModal />
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
            <Box pt="4">
              <Flex>
                <Button
                  backgroundColor={'green.900'}
                  rounded={'full'}
                  size={'lg'}
                  fontWeight={'normal'}
                  px={6}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
                <Spacer />

                <Button
                  backgroundColor={'green.900'}
                  rounded={'full'}
                  size={'lg'}
                  fontWeight={'normal'}
                  px={6}
                  isLoading={isSubmitting}
                  type="button"
                  onClick={() => {
                    setWaitingForCode(false)
                  }}
                >
                  Ask for a code
                </Button>
              </Flex>
            </Box>
          </FormComponent>
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

export default LoginPasswordLessTokenForm
