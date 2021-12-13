import PreferencesCell from 'src/components/Preference/PreferencesCell'
import { useState } from 'react'
import { routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'

export const initialColumns = [
  {
    Header: 'Id',
    accessor: 'id',
    link: (givenId) => {
      return routes.preference({ id: givenId })
    },
  },
  {
    Header: 'Entity',
    accessor: 'entity',
  },
  {
    Header: 'Value',
    accessor: 'value',
  },
  {
    Header: 'User',
    accessor: 'user',
    canSort: false,
    reference: true,
    model: 'user',
    field: 'name',
    link: (givenId) => {
      return routes.users({ q: `{AND:{userID: ${givenId}}}` })
    },
  },
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
const PreferencesPage = () => {
  let [fuzzyQuery, setFuzzyQuery] = useState('')
  let [query, setQuery] = useState('')
  let [orderBy, setOrderBy] = useState({ id: 'asc' })
  let [skip, setSkip] = useState(0)
  let [take, setTake] = useState(10)
  let [columns, setColumns] = useState(initialColumns)
  let deleteRoles = ['userDelete']
  return (
    <Fragment>
      <MetaTags
        title={'Users'}
        description={`Users`}
        /* you should un-comment description and add a unique description, 155 characters or less
  You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <PreferencesCell
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
        deleteRoles={deleteRoles}
      />
    </Fragment>
  )
}

export default PreferencesPage
