import PropertiesCell from 'src/components/Property/PropertiesCell'
import Properties from 'src/components/Property/Properties'

import { routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'

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
      {/*<PropertiesCell
        //fuzzyQuery={fuzzyQuery}
        //setFuzzyQuery={setFuzzyQuery}
        //query={query}
        //setQuery={setQuery}
        //columns={columns}
        //setColumns={setColumns}
        //orderBy={orderBy}
        //setOrderBy={setOrderBy}
        //skip={skip}
        //setSkip={setSkip}
        //take={take}
        //setTake={setTake}
        //roles={roles}
      />*/}
    </Fragment>
  )
}

export default PropertiesPage
