import UsersCell from 'src/components/User/UsersCell'
import { useState } from 'react'

const UsersPage = () => {
  let [queryFromPage, setQueryFromPage] = useState('')
  let [orderBy, setOrderBy] = useState({ id: 'asc' })
  let [skip, setSkip] = useState(0)
  let [take, setTake] = useState(10)
  let [columns, setColumns] = useState([
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ])
  return (
    <UsersCell
      queryFromPage={queryFromPage}
      setQueryFromPage={setQueryFromPage}
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
