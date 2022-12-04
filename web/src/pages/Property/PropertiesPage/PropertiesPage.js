import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Properties from 'src/components/Property/Properties'

const PropertiesPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Property'}
        description={'Property'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Properties />
    </Fragment>
  )
}

export default PropertiesPage
