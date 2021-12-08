import AboutComponent from 'src/components/AboutComponent'
import Testcomponent from 'src/components/TestcomponentCell'
import { useEffect, useState, Fragment } from 'react'
const AboutPage = () => {
  let [queryFromPage, setQueryFromPage] = useState('mi')
  let QUERY = gql`
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
  return (
    <>
      {/*<AboutComponent />*/}
      HERE{"'"}s MY QUERY FROM PAGE {"'"}
      {queryFromPage}
      {"'"}
      <br />
      <Testcomponent
        filter={queryFromPage}
        setQueryFromPage={setQueryFromPage}
        queryFromPage={queryFromPage}
        query={QUERY}
      />
    </>
  )
}

export default AboutPage
