import { useEffect, useState } from 'react'

import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { ListContext } from 'src/App.js'
import ListCell from 'src/components/ListCell'

const ListPage = ({
  table: tableProp,
  page: pageProp,
  take: takeProp,
  where: whereProp,
  orderBy: orderByProp,
}) => {
  // we are given the following props:
  // table: String!
  // page: Int
  // take: Int
  // where: String
  // orderBy: String

  // i need to allow changing of these props
  // and they need to be reflected in the url
  // lets do this with a button for now
  // and manage the data from the ListContext
  // table, page, take, where, orderBy
  const {
    table,
    setTable,
    page,
    setPage,
    take,
    setTake,
    where,
    setWhere,
    orderBy,
    setOrderBy,
  } = React.useContext(ListContext)
  // when the page loads, we need to set the state
  // to the values given to us by the url
  useEffect(() => {
    console.log({
      tableProp,
      pageProp,
      takeProp,
      whereProp,
      orderByProp,
    })
    if (tableProp) setTable(tableProp)
    if (pageProp) setPage(pageProp)
    if (takeProp) setTake(takeProp)
    if (whereProp) setWhere(whereProp)
    if (orderByProp) setOrderBy(orderByProp)
  }, [])

  return (
    <>
      <MetaTags title="List" description="List page" />

      {table && (
        <ListCell
          table={tableProp || table}
          page={page}
          take={take}
          where={where}
          orderBy={orderBy}
        />
      )}
    </>
  )
}

export default ListPage
