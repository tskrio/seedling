import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import { Fragment } from 'react'
//import { useAuth } from '@redwoodjs/auth'
import { useForm } from 'react-hook-form'
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
      createdAt
      updatedAt
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
      navigate(routes.users())
    },
  })
  const onDelete = () => {
    if (confirm('Are you sure you want to delete your account?')) {
      deleteMyProfile()
    }
  }

  let fields = [
    {
      name: 'username',
      prettyName: 'Username',
      required: 'This is required',
    },
    {
      name: 'name',
      prettyName: 'Name',
      required: 'This is required',
    },
    {
      name: 'email',
      prettyName: 'email',
      required: 'Yep',
    },
    {
      name: 'hashedPassword',
      prettyName: 'Password',
      required: 'Yep',
      type: 'password',
    },
  ]
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
      />
    </Fragment>
  )
}
