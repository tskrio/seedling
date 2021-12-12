import { useMutation, MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import Chance from 'chance'
const chance = new Chance()
const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
    }
  }
`

const NewGroup = () => {
  const [createGroup, { loading, error }] = useMutation(CREATE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group created')
      navigate(routes.groups())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const onSubmit = (data) => {
    /**TODO: FEAT Client Rules go here */
    onSave(data)
  }
  const onSave = (input) => {
    createGroup({ variables: { input } })
  }
  const fields = [
    {
      name: 'name',
      prettyName: 'Name',
      placeHolder: 'Give us a groupname!',
      defaultValue: `${chance.state({ full: true })} ${chance.profession()}s`,
    },
    {
      name: 'description',
      prettyName: 'Description',
      placeHolder: 'How would you describe this?',
      required: true,
    },
  ]
  const roles = {
    update: ['groupUpdate'],
    delete: ['groupDelete'],
  }
  return (
    <>
      <MetaTags
        title="New Group"
        description="New Group form"
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
      />
    </>
  )
}

export default NewGroup
