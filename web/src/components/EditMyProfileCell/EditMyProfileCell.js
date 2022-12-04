import { Fragment } from 'react'

import { Button, Flex, Spacer } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'

export const QUERY = gql`
  query getMyProfile {
    myProfile {
      username
      email
      name
    }
  }
`
const UPDATE_MY_PROFILE_MUTATION = gql`
  mutation UpdateMyProfileMutation($input: UpdateUserInput!) {
    updateMyProfile(input: $input) {
      id
      name
      email
    }
  }
`
export const DELETE_MY_PROFILE_MUTATION = gql`
  mutation DeleteMyProfileMutation {
    deletedRow: deleteMyProfile {
      id
      name
    }
  }
`
export const Loading = () => <FormSkeleton />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ myProfile }) => {
  const { logOut /*currentUser*/ } = useAuth()
  let user = myProfile

  const [updateMyProfile, { loading, error }] = useMutation(
    UPDATE_MY_PROFILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('User updated')
        navigate(routes.users())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    // if resetToken is empty delete it
    // if resetTokenExpiresAt is empty delete it
    if (data.resetToken === '') {
      delete data.resetToken
    }
    if (data.resetTokenExpiresAt === '') {
      delete data.resetTokenExpiresAt
    }
    onSave(data)
  }
  const onSave = (input) => {
    updateMyProfile({ variables: { input } })
  }
  const [deleteMyProfile] = useMutation(DELETE_MY_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success("You're account has been deleted")
      logOut()
    },
  })
  const onDelete = () => {
    if (confirm('Are you sure you want to delete your account?')) {
      deleteMyProfile()
    }
  }
  let fields = [
    {
      name: 'name',
      prettyName: 'Name (Visible by others)',
      required: 'This is required',
    },
    {
      name: 'email',
      prettyName: 'Email (required to send you details)',
      required: 'Yep',
    },
  ]
  if (!process.env.AUTH0_DOMAIN) {
    fields.push({
      name: 'hashedPassword',
      prettyName: 'Password',
      required: 'Yep',
      type: 'password',
    })
  }

  let roles = []
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`user.id`}
        description="Replace me with 155 charactes about this page"
      />
      <FormComponent
        record={user}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.home()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      >
        <Flex>
          <Button
            mt={4}
            colorScheme={'green'}
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
          <Spacer />

          <Button
            mt={4}
            colorScheme="red"
            isLoading={isSubmitting}
            type="button"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Flex>
      </FormComponent>
    </Fragment>
  )
}
