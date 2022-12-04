import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Groups from 'src/components/Group/Groups'

const GroupsPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Group'}
        description={'Group'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Groups />
    </Fragment>
  )
}

export default GroupsPage
