import UsersCell from 'src/components/User/UsersCell'
import { useState } from 'react'

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
      link: true,
    },
    {
      Header: 'Name',
      accessor: 'name',
      link: true,
      canRemove: false,
    },
    {
      Header: 'Email',
      accessor: 'email',
      link: true,
    },
    {
      Header: 'GroupMember',
      accessor: 'GroupMember',
      canSort: false,
      scripted: true,
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      canSort: false,
      canRemove: false,
    },
  ])
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
    />
  )
}

export default UsersPage
