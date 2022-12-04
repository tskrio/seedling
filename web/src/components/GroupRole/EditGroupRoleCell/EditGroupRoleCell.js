import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'

export const QUERY = gql`
  query EditGroupRoleById($id: Int!) {
    groupRole: groupRole(id: $id) {
      id
      createdAt
      updatedAt
      role
      groupId
      group {
        name
        id
      }
    }
  }
`
const UPDATE_GROUP_ROLE_MUTATION = gql`
  mutation UpdateGroupRoleMutation($id: Int!, $input: UpdateGroupRoleInput!) {
    updateGroupRole(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      role
      groupId
    }
  }
`
export const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($id: Int!) {
    deletedRow: deleteGroupRole(id: $id) {
      id
    }
  }
`

export const Loading = () => <FormSkeleton />

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ groupRole }) => {
  const [updateGroupRole, { loading, error }] = useMutation(
    UPDATE_GROUP_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupRole updated')
        navigate(routes.groupRoles())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, groupRole.id)
  }
  const onSave = (input, id) => {
    const castInput = Object.assign(input, { groupId: parseInt(input.groupId) })
    updateGroupRole({ variables: { id, input: castInput } })
  }

  const [deleteGroupRole] = useMutation(DELETE_GROUP_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('GroupRole deleted')
      navigate(routes.groupRoles())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete GroupRole ' + id + '?')) {
      deleteGroupRole({ variables: { id } })
    }
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
      // If this is a reference you probably want this below
      // update the query above "EditGroupRoleById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'id',
      defaultValue: groupRole?.group?.id,
      defaultDisplay: groupRole?.group?.name,
      QUERY: gql`
        query Find_referencedModelHere_FromGroupRoles(
          $filter: String
          $skip: Int
        ) {
          search: groups(filter: $filter, skip: $skip) {
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
        title={`groupRole.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={groupRole}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
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
