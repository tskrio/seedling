import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import LogsCell from 'src/components/Log/LogsCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Created at',
    accessor: 'createdAt',
    link: (givenId) => {
      return routes.log({ id: givenId })
    },
    showMatching,
    filterOut,
    dataType: 'timestamp',
  },

  {
    Header: 'Message',
    accessor: 'message',
    showMatching,
    filterOut,
  },
  {
    Header: 'Source',
    accessor: 'source',
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

const LogsList = () => {
  let [orderBy, setOrderBy] = useState({ createdAt: 'desc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'logCreate',
    updateRecord: 'logUpdate',
    deleteRecord: 'logDelete',
  }

  return (
    <Fragment>
      <LogsCell
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
        displayColumn="id"
        roles={roles}
      />
    </Fragment>
  )
}

export default LogsList
