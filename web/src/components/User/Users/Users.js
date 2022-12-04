import { routes } from '@redwoodjs/router'

import { Fragment, useState } from 'react'

import UsersCell from 'src/components/User/UsersCell'

import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Name',
    accessor: 'name',
    link: (givenId) => {
      return routes.user({ id: givenId })
    },
    showMatching,
    filterOut,
  },
  // TODO: check if the logged in user can see groupMembers,
  // TODO: ln2 and add this appropriately
  // TODO: ln3 somehow include/exclude the data from the graphql call
  //{
  //  Header: 'Groups',
  //  accessor: 'GroupMember',
  //  canSort: false,
  //  aggregate: true,
  //  model: 'group',
  //  link: (givenId) => {
  //    return routes.groupMembers({ q: `{"userId":${givenId}}` })
  //  },
  //},
  {
    Header: 'Preferences',
    accessor: 'Preference',
    canSort: false,
    aggregate: true,
    model: 'preference',
    field: 'entity',
    link: (givenId) => {
      //q={%22AND%22:{%22userID%22:%20620}}
      //q={"AND":[{"userId":{"equals":620}}]}
      return routes.preferences({ q: `{"userId":${givenId}}` })
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
    canEdit: true,
    editLink: (givenId) => {
      return routes.user({ id: givenId })
    },
    canDelete: true,
  },
]

const UsersList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'userCreate',
    updateRecord: 'userUpdate',
    deleteRecord: 'userDelete',
  }

  return (
    <Fragment>
      <UsersCell
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

export default UsersList
