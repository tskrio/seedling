import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import MessagesCell from 'src/components/Message/MessagesCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Entity',
    accessor: 'entity',
    link: (givenId) => {
      return routes.editMessage({ id: givenId })
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
    Header: 'Language',
    accessor: 'language',
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

const MessagesList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'messageCreate',
    updateRecord: 'messageUpdate',
    deleteRecord: 'messageDelete',
  }

  return (
    <Fragment>
      <MessagesCell
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

export default MessagesList
