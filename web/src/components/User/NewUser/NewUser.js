import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import FormComponent from 'src/components/FormComponent'
import { useForm } from 'react-hook-form'
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
    // generate random salt
    const salt = Math.random().toString(36).substring(2, 15)
    data.salt = salt
    onSave(data)
  }

  const onSave = (input) => {
    createUser({ variables: { input } })
  }
  let randomNameGenerator = () => {
    let firstNames = [
      'Ashley',
      'Ben',
      'Charlie',
      'Daniel',
      'Ethan',
      'George',
      'Harry',
      'Isaac',
      'Kai',
      'Lewis',
      'Matthew',
      'Noah',
      'Oliver',
      'Rhys',
      'Samuel',
      'Thomas',
      'William',
      'Annabelle',
      'Bethany',
      'Chloe',
      'Daisy',
      'Ebony',
      'Freya',
      'Grace',
      'Hannah',
      'Isla',
      'Jessica',
      'Katie',
      'Lara',
      'Martha',
      'Nell',
      'Olivia',
      'Polly',
      'Rosie',
      'Sophie',
      'Tilly',
      'Victoria',
      'Zarah',
    ]
    let lastNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    let firstName = firstNames[Math.floor(firstNames.length * Math.random())]
    let lastName = lastNames[Math.floor(lastNames.length * Math.random()) - 1]
    return `${firstName} ${lastName}`
  }
  let randomName = randomNameGenerator()
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
      required: 'This is required',
      defaultValue: randomName,
    },
    {
      name: 'email',
      prettyName: 'Email',
      required: 'This is required',
      defaultValue: `${randomName.replace(' ', '.').toLowerCase()}@example.com`,
    },
    {
      name: 'hashedPassword',
      prettyName: 'Password',
      required: 'This is required',
      type: 'password',
      defaultValue: 'password',
    },
  ]
  const roles = {
    update: ['userUpdate'],
    delete: ['userDelete'],
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
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
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

export default NewUser
