import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import PreferencesCell from 'src/components/Preference/PreferencesCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Entity',
    accessor: 'entity',
    link: (givenId) => {
      return routes.preference({ id: givenId })
    },
    showMatching,
    filterOut,
  },
  {
    Header: 'Value',
    accessor: 'value',
    showMatching,
    filterOut,
  },

  {
    Header: 'User',
    accessor: 'user',
    showMatching,
    filterOut,
    dataType: 'integer',
    canSort: false,
    reference: true,
    model: 'user',
    field: 'name',
    link: (givenId) => {
      return routes.users({ q: `{"id":${givenId}}` })
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

const PreferencesList = ({ initialQuery }) => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState(initialQuery) // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'preferenceCreate',
    updateRecord: 'preferenceUpdate',
    deleteRecord: 'preferenceDelete',
  }

  return (
    <Fragment>
      <PreferencesCell
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        columns={columns}
        setColumns={setColumns}
        initialColumns={initialColumns}
        take={take}
        setTake={setTake}
        skip={skip}
        setSkip={setSkip}
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        displayColumn="entity"
        roles={roles}
      />
    </Fragment>
  )
}

export default PreferencesList
