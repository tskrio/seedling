import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import GroupMembersCell from 'src/components/GroupMember/GroupMembersCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Id',
    accessor: 'cuid',
    showMatching,
    filterOut,
    link: (givenId) => {
      return routes.groupMember({ cuid: givenId })
    },
    dataType: 'integer',
  },
  {
    Header: 'User',
    accessor: 'User',
    showMatching,
    filterOut,
    canSort: false,
    reference: true,
    model: 'user',
    field: 'name',
    link: (givenId) => {
      // e.g. return routes._insertPluralModelHere_({ q: {"id": givenId}})
      // e.g. return routes.users({ q: `{"id": }` })// link to a list w/the query
      return routes.user({ cuid: givenId }) // link to the record
    },
  },

  {
    Header: 'Group',
    accessor: 'Group',
    showMatching,
    filterOut,
    canSort: false,
    reference: true,
    //model: 'group',
    field: 'name',
    link: (givenId) => {
      // e.g. return routes._insertPluralModelHere_({ q: {"id": givenId}})
      // e.g. return routes.users({ q: `{"id": }` })// link to a list w/the query
      return routes.group({ cuid: givenId }) // link to the record
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

const GroupMembersList = ({ initialQuery }) => {
  let [orderBy, setOrderBy] = useState({ createdAt: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState(initialQuery) // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'groupmemberCreate',
    updateRecord: 'groupmemberUpdate',
    deleteRecord: 'groupmemberDelete',
  }
  return (
    <Fragment>
      <GroupMembersCell
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

export default GroupMembersList
