import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import GroupRoles from 'src/components/GroupRole/GroupRoles'

const GroupRolesPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'GroupRole'}
        description={'GroupRole'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <GroupRoles />
    </Fragment>
  )
}

export default GroupRolesPage
