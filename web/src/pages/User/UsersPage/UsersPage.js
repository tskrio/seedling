import UsersCell from 'src/components/User/UsersCell'
import { useState } from 'react'
import { Link, routes, useLocation } from '@redwoodjs/router'
const UsersPage = () => {
  let [fuzzyQuery, setFuzzyQuery] = useState('')
  let [query, setQuery] = useState('')
  let [orderBy, setOrderBy] = useState({ id: 'asc' })
  let [skip, setSkip] = useState(0)
  let [take, setTake] = useState(10)
  let [columns, setColumns] = useState([
    {
      Header: 'ID',
      accessor: 'id',
      //link: true,
      link: (givenId) => {
        return routes.user({ id: givenId })
      },
    },
    {
      Header: 'Name',
      accessor: 'name',
      link: (givenId) => {
        return routes.user({ id: givenId })
      },
      canRemove: false,
    },
    {
      Header: 'Email',
      accessor: 'email',
      link: (givenId) => {
        return routes.user({ id: givenId })
      },
    },
    {
      Header: 'GroupMember',
      accessor: 'GroupMember',
      canSort: false,
      scripted: true,
      model: 'group',
      field: 'name',
      link: (givenId) => {
        return routes.groupMembers({ q: `{AND:{userID: ${givenId}}}` })
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      canSort: false,
      canRemove: false,
    },
  ])
  let deleteRoles = ['userDelete']
  return (
    <UsersCell
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
  )
}

export default UsersPage
