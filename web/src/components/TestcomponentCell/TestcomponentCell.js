import { useEffect, useState, Fragment } from 'react'
export const beforeQuery = (props) => {
  var now = new Date()
  console.log(`${now.toISOString()} beforeQuery props`, props)
  return {
    variables: {
      filter: props.queryFromPage,
    },
    //fetchPolicy: 'network',
    //query: props.query,
  }
}
export const QUERY = gql`
  query FindUsersTC($filter: String, $skip: Int, $q: String) {
    users(filter: $filter, skip: $skip, q: $q) {
      count
      take
      skip
      q
      results {
        id
        name
      }
    }
  }
`
export const Loading = () => <div>????Loading...</div>

//export const Empty = () => <div>????Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>{error.message}</div>
)

export const Success = ({ queryFromPage, setQueryFromPage, users }) => {
  let [query, setQuery] = useState(queryFromPage)
  //console.log('queryFromPage', queryFromPage)
  let handleSearchInput = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
    //setQueryFromPage(event.target.value)
    //refetch()
  }
  let handleSearchButton = () => {
    console.log(`searching for ${query}`)
    setQueryFromPage(query)
  }
  //console.log(users.results)
  let list = users.results.map((user, index) => {
    return (
      <li key={index}>
        {user.name} ({user.id})
      </li>
    )
  })
  return (
    <Fragment>
      <input onChange={handleSearchInput} />
      <button onClick={handleSearchButton}>Go</button>
      {list}
    </Fragment>
  )
}
