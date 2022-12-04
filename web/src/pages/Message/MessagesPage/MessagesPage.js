import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Messages from 'src/components/Message/Messages'

const MessagesPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Message'}
        description={'Message'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Messages />
    </Fragment>
  )
}

export default MessagesPage
