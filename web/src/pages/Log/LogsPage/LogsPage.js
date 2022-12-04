import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Logs from 'src/components/Log/Logs'

const LogsPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Log'}
        description={'Log'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Logs />
    </Fragment>
  )
}

export default LogsPage
