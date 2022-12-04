import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import GroupsCell from 'src/components/Group/GroupsCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  //{
  //  Header: 'Id',
  //  accessor: 'id',
  //  showMatching,
  //  filterOut,
  //  dataType: 'integer',
  //},

  // {
  //   Header: 'Created at',
  //   accessor: 'createdAt',
  //   showMatching,
  //   filterOut,
  //   dataType: 'timestamp',
  // },
  //
  // {
  //   Header: 'Updated at',
  //   accessor: 'updatedAt',
  //   showMatching,
  //   filterOut,
  //   dataType: 'timestamp',
  // },

  {
    Header: 'Name',
    accessor: 'name',
    link: (givenId) => {
      return routes.group({ id: givenId })
    },
    showMatching,
    filterOut,
  },

  {
    Header: 'Description',
    accessor: 'description',
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

const GroupsList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'groupCreate',
    updateRecord: 'groupUpdate',
    deleteRecord: 'groupDelete',
  }

  return (
    <Fragment>
      <GroupsCell
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
        displayColumn="name"
        roles={roles}
      />
    </Fragment>
  )
}

export default GroupsList
