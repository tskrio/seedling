import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import FormComponent from 'src/components/FormComponent'

const CREATE_GROUP_MEMBER_MUTATION = gql`
  mutation CreateGroupMemberMutation($input: CreateGroupMemberInput!) {
    createGroupMember(input: $input) {
      id
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
    /**TODO: FEAT Client Rules go here */
    onSave(data)
  }

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      userId: parseInt(input.userId),
      groupId: parseInt(input.groupId),
    })
    createGroupMember({ variables: { input: castInput } })
  }
  let user = {
    id: null,
    name: null,
  }
  const fields = [
    //{
    //  name: 'userId',
    //  prettyName: 'User id',
    //},
    {
      prettyName: 'Users',
      name: 'userId',
      type: 'reference',
      display: 'name',
      value: 'id',
      defaultValue: user.id,
      defaultDisplay: user.name,
      QUERY: gql`
        query FindReferenceFieldQueryNewGroupMember(
          $filter: String
          $skip: Int
        ) {
          search: users(filter: $filter, skip: $skip) {
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
    {
      name: 'groupId',
      prettyName: 'Group id',
    },
  ]

  const roles = {
    update: ['groupMemberUpdate'],
    delete: ['groupMemberDelete'],
  }

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
      />
    </Fragment>
  )
}

export default NewGroupMember
