import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
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
    /**TODO: FEAT Client Rules go here */
    onSave(data)
  }

  const onSave = (input) => {
    const castInput = Object.assign(input, { groupId: parseInt(input.groupId) })
    createGroupRole({ variables: { input: castInput } })
  }
  const fields = [
    {
      name: 'id',
      prettyName: 'Id',
    },
    {
      name: 'createdAt',
      prettyName: 'Created at',
    },
    {
      name: 'updatedAt',
      prettyName: 'Updated at',
    },
    {
      name: 'role',
      prettyName: 'Role',
    },
    {
      name: 'groupId',
      prettyName: 'Group id',
    },
  ]

  const roles = {
    update: ['groupRoleUpdate'],
    delete: ['groupRoleDelete'],
  }

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
      />
    </Fragment>
  )
}

export default NewGroupRole
