import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'

export const QUERY = gql`
  query EditGroupRoleById($cuid: String!) {
    groupRole: groupRole(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      role
      groupCuid
      Group {
        name
        cuid
      }
    }
  }
`
const UPDATE_GROUP_ROLE_MUTATION = gql`
  mutation UpdateGroupRoleMutation(
    $cuid: String!
    $input: UpdateGroupRoleInput!
  ) {
    updateGroupRole(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      role
      groupCuid
    }
  }
`
export const DELETE_GROUP_ROLE_MUTATION = gql`
  mutation DeleteGroupRoleMutation($cuid: String!) {
    deletedRow: deleteGroupRole(cuid: $cuid) {
      cuid
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
    onSave(data, groupRole.cuid)
  }
  const onSave = (input, cuid) => {
    const castInput = Object.assign(input, {
      groupCuid: input.groupCuid,
    })
    updateGroupRole({ variables: { cuid, input: castInput } })
  }

  const [deleteGroupRole] = useMutation(DELETE_GROUP_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('GroupRole deleted')
      navigate(routes.groupRoles())
    },
  })

  const onDelete = (id) => {
    let cuid = groupRole.cuid
    if (confirm('Are you sure you want to delete GroupRole ' + id + '?')) {
      deleteGroupRole({ variables: { cuid } })
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
      name: 'groupCuid',
      prettyName: 'Group id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditGroupRoleById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'cuid',
      defaultValue: groupRole?.Group?.cuid,
      defaultDisplay: groupRole?.Group?.name,
      QUERY: gql`
        query FindGroupFromEditGroupRoles(
          $filter: String
          $skip: Int
          $take: Int
        ) {
          search: groups(filter: $filter, skip: $skip, take: $take) {
            count
            take
            skip
            results {
              cuid
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
        title={`groupRole.cuid`}
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
        returnLink={routes.list({table: 'groupRoles'})}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
