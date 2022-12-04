import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import GroupMembers from 'src/components/GroupMember/GroupMembers'

const GroupMembersPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'GroupMember'}
        description={'GroupMember'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <GroupMembers />
    </Fragment>
  )
}

export default GroupMembersPage
