import { routes } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import GroupRolesCell from 'src/components/GroupRole/GroupRolesCell'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Group',
    accessor: 'group',
    showMatching,
    filterOut,
    // dataType: 'integer',
    // If this is a reference
    // you may want to show a field
    // instead of the number here.
    // todo that remove type,
    // updated your query on the cell to include the model
    // update the accessor to a name not used by a column
    // and add;
    canSort: false,
    reference: true,
    model: 'group',
    field: 'name',
    link: (givenId) => {
      return routes.group({ id: givenId })
    },
  },
  {
    Header: 'Role',
    accessor: 'role',
    link: (givenId) => {
      return routes.groupRole({ id: givenId })
    },
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

const GroupRolesList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query // TODO: Fix this doesnt work
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'grouproleCreate',
    updateRecord: 'grouproleUpdate',
    deleteRecord: 'grouproleDelete',
  }

  return (
    <Fragment>
      <GroupRolesCell
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

export default GroupRolesList
