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
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import CookieModal from 'src/components/CookieModal'
import FormComponent from 'src/components/FormComponent'

const GENERATE_LOGIN_TOKEN = gql`
  mutation generateLoginToken($email: String!) {
    generateLoginToken(email: $email) {
      message
    }
  }
`
const LoginPasswordLessForm = ({ setWaitingForCode, setEmail }) => {
  const [generateLoginToken, { loading, error }] = useMutation(
    GENERATE_LOGIN_TOKEN,
    {
      onCompleted: () => {
        toast.success('Check your email for a login link')
        setWaitingForCode(true)
      },
    }
  )
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const onSubmit = async (data) => {
    setEmail(data.username)
    const response = await generateLoginToken({
      variables: { email: data.username },
      fetchPolicy: 'no-cache',
    })
    if (response.error) {
      toast.error(response.error)
    }
  }
  let fields = [
    {
      name: 'username',
      prettyName: 'Email',
      placeholder: 'deckard.cain@example.com',
      required: 'This is required',
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
            <Flex pt="4">
              <Box pl="4">
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
          </FormComponent>
          <Flex></Flex>
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

export default LoginPasswordLessForm
