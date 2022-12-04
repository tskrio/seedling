import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Users from 'src/components/User/Users'

const UsersPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'User'}
        description={'User'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Users />
    </Fragment>
  )
}

export default UsersPage
