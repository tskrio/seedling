import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import PropertiesCell from 'src/components/Property/PropertiesCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Entity',
    accessor: 'entity',
    showMatching,
    filterOut,
    link: (givenId) => {
      return routes.property({ id: givenId })
    },
  },

  {
    Header: 'Type',
    accessor: 'type',
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
    Header: 'Actions',
    accessor: 'actions',
    canSort: false,
    canRemove: false,
    canReset: true,
    canExport: true,
    canSetTake: true,
  },
]

const PropertiesList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'propertyCreate',
    updateRecord: 'propertyUpdate',
    deleteRecord: 'propertyDelete',
  }

  return (
    <Fragment>
      <PropertiesCell
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

export default PropertiesList
