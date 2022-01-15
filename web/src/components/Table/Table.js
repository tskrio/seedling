import { useEffect, useState, Fragment } from 'react'
import { useQuery, ApolloClient } from '@apollo/client'
//import ReactTable from 'src/components/ReactTable'

const Table = () => {
  const [filterString, setFitlerString] = useState('')
  const [skip, setSkip] = useState(0)
  const [loadedData, setLoadedData] = useState()
  const QUERY = gql`
    query findUsersForTest($filter: String, $skip: Int) {
      search: users(filter: $filter, skip: $skip) {
        count
        take
        skip
        results {
          id
          name
        }
      }
    }
  `
  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: {
      filter: filterString || 'mi',
      skip,
    },
    onCompleted: () => {
      setLoadedData(data)
    },
  })
  let handleSkipUpdate = () => {
    setSkip(skip + 1)
    refetch()
    //setLoadedData(data)
    //refetch()
  }
  let handleSearchInput = (event) => {
    setFitlerString(event.target.value)
    refetch()
  }
  //if (loading) return <p>Loading Lazy Data</p>
  //if (error) return <p>`Error! ${error}`</p>
  //if (data) handleSearchResult(data)
  let output
  try {
    output = loadedData?.search.results.map((result) => {
      return (
        <p key={result.id}>
          {result.name} ({result.id})
        </p>
      )
    })
  } catch (error) {
    console.error(error.message)
  }

  return (
    <Fragment>
      <button className="rw-button rw-button-blue " onClick={handleSkipUpdate}>
        Set Skip to {parseInt(skip, 10) + 1}
      </button>
      <input onChange={handleSearchInput} />
      {output}
    </Fragment>
  )
}
export default Table
