import { useForm } from 'react-hook-form'

import FormComponent from './FormComponent'

//import { toast } from '@redwoodjs/web/toast'
//import { useMutation } from '@redwoodjs/web'
//import { navigate, routes } from '@redwoodjs/router'

const {
  handleSubmit,
  register,
  formState: { errors, isSubmitting },
} = useForm()
export const generated = () => {
  //  const CREATE_GROUP_MUTATION = gql`
  //    mutation CreateGroupMutation($input: CreateGroupInput!) {
  //      createGroup(input: $input) {
  //        id
  //      }
  //    }
  //  `
  //  const [createGroup, { loading, error }] = useMutation(CREATE_GROUP_MUTATION, {
  //    onCompleted: () => {
  //      toast.success('Group created')
  //      navigate(routes.groups())
  //    },
  //    onError: (error) => {
  //      toast.error(error.message)
  //    },
  //  })
  //
  const onSubmit = (data) => {
    onSave(data)
  }

  const onSave = (input) => {
    alert(JSON.stringify(input))
    //    createGroup({ variables: { input } })
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
      required: 'This is required',
    },
    {
      name: 'description',
      prettyName: 'Description',
      required: 'This is required',
    },
  ]

  const roles = {
    update: ['groupUpdate'],
    delete: ['groupDelete'],
  }

  return (
    <FormComponent
      fields={fields}
      roles={roles}
      onSubmit={onSubmit}
      loading={{}}
      error={{}}
      returnLink={{}}
      handleSubmit={handleSubmit}
      register={register}
      formState={{ errors, isSubmitting }}
    />
  )
}

export default { title: 'Components/FormComponent' }
