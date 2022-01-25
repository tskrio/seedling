import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import FormComponent from 'src/components/FormComponent'
import { useForm } from 'react-hook-form'
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
  const fields = [
    {
      name: 'userId',
      prettyName: 'User id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      // type: 'reference',
      // display: 'name',
      // value: 'id',
      // QUERY: gql`
      //   query Find_referencedModelHere_FromGroupMembers(
      //     $filter: String
      //     $skip: Int
      //   ) {
      //     search: _referencedPluralModelHere_(filter: $filter, skip: $skip) {
      //       count
      //       take
      //       skip
      //       results {
      //         id
      //         name
      //       }
      //     }
      //   }
      // `,
    },
    {
      name: 'groupId',
      prettyName: 'Group id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      // type: 'reference',
      // display: 'name',
      // value: 'id',
      // QUERY: gql`
      //   query Find_referencedModelHere_FromGroupMembers(
      //     $filter: String
      //     $skip: Int
      //   ) {
      //     search: _referencedPluralModelHere_(filter: $filter, skip: $skip) {
      //       count
      //       take
      //       skip
      //       results {
      //         id
      //         name
      //       }
      //     }
      //   }
      // `,
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
