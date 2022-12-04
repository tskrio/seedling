import { Fragment } from 'react'

import { MetaTags } from '@redwoodjs/web'

import Preferences from 'src/components/Preference/Preferences'

const PreferencesPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Preference'}
        description={'Preference'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Preferences />
    </Fragment>
  )
}

export default PreferencesPage
