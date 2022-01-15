import { routes } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import PropertiesCell from 'src/components/Property/PropertiesCell'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Id',
    accessor: 'id',
    link: (givenId) => {
      return routes.property({ id: givenId })
    },
    dataType: 'integer',
    showMatching,
    filterOut,
  },
  {
    Header: 'createdAt',
    accessor: 'createdAt',
    showMatching,
    dataType: 'timestamp',
    filterOut,
  },

  {
    Header: 'Entity',
    accessor: 'entity',
    link: (givenId) => {
      return routes.property({ id: givenId })
    },
    showMatching,
    filterOut,
  },
  {
    Header: 'Value',
    accessor: 'value',
    showMatching,
    filterOut,
  },

  /** Insert your columns here **/
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

const PropertiesList = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState({ entity: 'email' }) // default query // TODO: Fix this doesnt work
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  return (
    <Fragment>
      <PropertiesCell
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
      />
    </Fragment>
  )
}

export default PropertiesList
