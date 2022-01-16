import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import FormComponent from 'src/components/FormComponent'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const NewUser = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User created')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    /**TODO: FEAT Client Rules go here */
    onSave(data)
  }

  const onSave = (input) => {
    createUser({ variables: { input } })
  }
  const fields = [
    {
      name: 'email',
      prettyName: 'Email',
      required: 'This is required',
    },

    {
      name: 'name',
      prettyName: 'Name',
      required: 'This is required',
    },

    {
      name: 'hashedPassword',
      prettyName: 'Hashed password',
      required: 'This is required',
    },

    {
      name: 'salt',
      prettyName: 'Salt',
      required: 'This is required',
    },

    {
      name: 'resetToken',
      prettyName: 'Reset token',
    },

    {
      name: 'resetTokenExpiresAt',
      prettyName: 'Reset token expires at',
    },
  ]

  const roles = {
    update: ['userUpdate'],
    delete: ['userDelete'],
  }

  return (
    <Fragment>
      <MetaTags
        title="New User"
        description="New User form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        returnLink={routes.users()}
      />
    </Fragment>
  )
}

export default NewUser
