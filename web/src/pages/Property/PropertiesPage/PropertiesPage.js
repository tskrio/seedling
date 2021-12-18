import PropertiesCell from 'src/components/Property/PropertiesCell'
import { useState } from 'react'
import { routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'

export const initialColumns = [
  {
    Header: 'Id',
    accessor: 'id',
    link: (givenId) => {
      return routes.property({ id: givenId })
    },
    dataType: 'integer',
    showMatching,
    filterOut,
  },

  /** Insert your columns here **/
  {
    Header: 'Actions',
    accessor: 'actions',
    canSort: false,
    canRemove: false,
    canReset: true,
    canExport: true,
    canSetTake: true,
  },
]

const PropertiesPage = () => {
  let [fuzzyQuery, setFuzzyQuery] = useState('')
  let [query, setQuery] = useState('')
  let [orderBy, setOrderBy] = useState({ id: 'asc' })
  let [skip, setSkip] = useState(0)
  let [take, setTake] = useState(10)
  let [columns, setColumns] = useState(initialColumns)
  let roles = {
    createRecord: 'propertyCreate',
    updateRecord: 'propertyUpdate',
    deleteRecord: 'propertyDelete',
  }

  return (
    <Fragment>
      <MetaTags
        title={'Property'}
        description={'Property'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <PropertiesCell
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        query={query}
        setQuery={setQuery}
        columns={columns}
        setColumns={setColumns}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        skip={skip}
        setSkip={setSkip}
        take={take}
        setTake={setTake}
        roles={roles}
      />
    </Fragment>
  )
}

export default PropertiesPage
