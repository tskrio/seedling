import UsersCell from 'src/components/User/UsersCell'
import { useState } from 'react'
import { routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    dataType: 'integer',
    //link: true,
    link: (givenId) => {
      return routes.user({ id: givenId })
    },
    showMatching,
    filterOut,
  },
  {
    Header: 'Name',
    accessor: 'name',
    link: (givenId) => {
      return routes.user({ id: givenId })
    },
    canRemove: false,
    showMatching,
    filterOut,
  },
  {
    Header: 'Email',
    accessor: 'email',
    link: (givenId) => {
      return routes.user({ id: givenId })
    },
  },
  {
    Header: 'Created',
    accessor: 'createdAt',
    showMatching,
    filterOut,
  },
  {
    Header: 'Groups',
    accessor: 'GroupMember',
    canSort: false,
    aggregate: true,
    model: 'group',
    link: (givenId) => {
      return routes.groupMembers({ q: `{"userID":${givenId}}` })
    },
  },
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
  },
]
const UsersPage = () => {
  let [fuzzyQuery, setFuzzyQuery] = useState('')
  let [query, setQuery] = useState('')
  let [orderBy, setOrderBy] = useState({ id: 'asc' })
  let [skip, setSkip] = useState(0)
  let [take, setTake] = useState(10)
  let [columns, setColumns] = useState(initialColumns)
  let roles = {
    createRecord: 'userCreate',
    updateRecord: 'userUpdate',
    deleteRecord: 'userDelete',
  }
  return (
    <Fragment>
      <MetaTags
        title={'Users'}
        description={`Users`}
        /* you should un-comment description and add a unique description, 155 characters or less
  You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
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
        roles={roles}
      />
    </Fragment>
  )
}

export default UsersPage
