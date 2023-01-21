import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'
import FormSkeleton from 'src/components/FormSkeleton/FormSkeleton'
export const QUERY = gql`
  query EditGroupMemberById($cuid: String!) {
    groupMember: groupMember(cuid: $cuid) {
      cuid
      createdAt
      updatedAt
      userCuid
      User {
        cuid
        name
      }
      groupCuid
      Group {
        name
        cuid
      }
    }
  }
`
const UPDATE_GROUP_MEMBER_MUTATION = gql`
  mutation UpdateGroupMemberMutation(
    $cuid: String!
    $input: UpdateGroupMemberInput!
  ) {
    updateGroupMember(cuid: $cuid, input: $input) {
      cuid
      createdAt
      updatedAt
      userCuid
      groupCuid
    }
  }
`
export const DELETE_GROUP_MEMBER_MUTATION = gql`
  mutation DeleteGroupMemberMutation($cuid: String!) {
    deletedRow: deleteGroupMember(cuid: $cuid) {
      cuid
    }
  }
`

export const Loading = () => <FormSkeleton />

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ groupMember }) => {
  const [updateGroupMember, { loading, error }] = useMutation(
    UPDATE_GROUP_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupMember updated')
        navigate(routes.groupMembers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, groupMember.cuid)
  }
  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      userCuid: parseInt(input.userCuid),
      groupCuid: parseInt(input.groupCuid),
    })
    updateGroupMember({ variables: { id, input: castInput } })
  }

  const [deleteGroupMember] = useMutation(DELETE_GROUP_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('GroupMember deleted')
      navigate(routes.groupMembers())
    },
  })

  const onDelete = (id) => {
    let cuid = groupMember.cuid
    if (confirm('Are you sure you want to delete GroupMember ' + id + '?')) {
      deleteGroupMember({ variables: { cuid } })
    }
  }
  const fields = [
    {
      name: 'userCuid',
      prettyName: 'User',
      required: 'This is required',
      type: 'reference',
      display: 'name',
      value: 'cuid',
      defaultValue: groupMember.User.cuid,
      defaultDisplay: groupMember.User.name,
      QUERY: gql`
        query FindUserFromGroupMembers(
          $filter: String
          $skip: Int
          $take: Int
        ) {
          search: users(filter: $filter, skip: $skip, take: $take) {
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
    {
      // {"name":"groupCuid","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"type":"Int","hasDefaultValue":false,"isGenerated":false,"isUpdatedAt":false,"label":"Group id","component":"NumberField","defaultProp":"defaultValue","deserilizeFunction":"","validation":"{{ required: true }}","listDisplayFunction":"truncate"}
      name: 'groupCuid',
      prettyName: 'Group id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditGroupMemberById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'id',
      defaultValue: groupMember.Group.cuid,
      defaultDisplay: groupMember.Group.name,
      QUERY: gql`
        query FindGroupFromGroupMembers(
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
    update: ['groupMemberUpdate'],
    delete: ['groupMemberDelete'],
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`groupMember.cuid`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={groupMember}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.groupMembers()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
