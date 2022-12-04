import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_GROUP_ROLE_MUTATION = gql`
  mutation CreateGroupRoleMutation($input: CreateGroupRoleInput!) {
    createGroupRole(input: $input) {
      id
    }
  }
`

const NewGroupRole = () => {
  const [createGroupRole, { loading, error }] = useMutation(
    CREATE_GROUP_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupRole created')
        navigate(routes.groupRoles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data)
  }

  const onSave = (input) => {
    const castInput = Object.assign(input, { groupId: parseInt(input.groupId) })
    createGroupRole({ variables: { input: castInput } })
  }
  let models = [
    'user',
    'group',
    'groupMember',
    'groupRole',
    'message',
    'property',
    'preference',
  ]
  let crudRoles = ['admin']
  models.forEach((model) => {
    crudRoles.push(model + 'Create')
    crudRoles.push(model + 'Read')
    crudRoles.push(model + 'Update')
    crudRoles.push(model + 'Delete')
  })
  const fields = [
    {
      name: 'role',
      prettyName: 'Role',
      required: 'This is required',
      type: 'select',
      options: crudRoles,
    },
    {
      name: 'groupId',
      prettyName: 'Group id',
      required: 'This is required',
      // uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindUsersFromGroupRoleNew(
          $filter: String
          $skip: Int
          $take: Int
        ) {
          search: groups(filter: $filter, skip: $skip, take: $take) {
            count
            take
            skip
            results {
              id
              name
            }
          }
        }
      `,
    },
  ]

  const roles = {
    update: ['groupRoleUpdate'],
    delete: ['groupRoleDelete'],
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title="New GroupRole"
        description="New GroupRole form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        returnLink={routes.groupRoles()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

export default NewGroupRole
