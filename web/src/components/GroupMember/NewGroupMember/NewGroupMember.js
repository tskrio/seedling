import { Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FormComponent from 'src/components/FormComponent'

const CREATE_GROUP_MEMBER_MUTATION = gql`
  mutation CreateGroupMemberMutation($input: CreateGroupMemberInput!) {
    createGroupMember(input: $input) {
      cuid
    }
  }
`

const NewGroupMember = () => {
  const [createGroupMember, { loading, error }] = useMutation(
    CREATE_GROUP_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupMember created')
        navigate(routes.groupMembers())
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
    const castInput = {
      userCuid: input.userCuid,
      groupCuid: input.groupCuid,
    }
    createGroupMember({ variables: { input: castInput } })
  }
  const fields = [
    {
      name: 'userCuid',
      prettyName: 'User',
      required: 'This is required',
      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'cuid',
      QUERY: gql`
        query FindUsersFromNewGroupMembers(
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
      name: 'groupCuid',
      prettyName: 'Group',
      required: 'This is required',
      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'cuid',
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
        title="New GroupMember"
        description="New GroupMember form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
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

export default NewGroupMember
