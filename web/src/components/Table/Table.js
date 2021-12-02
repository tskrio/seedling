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
      filter: filterString || '',
      skip,
    },
    onCompleted: () => {
      //console.log(data)
      setLoadedData(data)
    },
  })
  let handleSearchResult = () => {
    console.log('handleSearchResult')
    setSkip(skip + 1)
    refetch()
    //setLoadedData(data)
    //refetch()
  }
  //if (loading) return <p>Loading Lazy Data</p>
  //if (error) return <p>`Error! ${error}`</p>
  //if (data) handleSearchResult(data)
  let output
  try {
    output = loadedData.search.results.map((result) => {
      return <p key={result.id}>{result.name}</p>
    })
  } catch (error) {
    console.log(error.message)
  }

  return (
    <Fragment>
      <button
        className="rw-button rw-button-blue "
        onClick={handleSearchResult}
      >
        Set Skip to {parseInt(skip, 10) + 1}
      </button>
      {output}
    </Fragment>
  )
}
export default Table
