import { useState } from 'react'

import TablePagination from './TablePagination'
export const Generated = () => {
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take

  return (
    <TablePagination
      count={1000}
      skip={skip}
      setSkip={setSkip}
      take={take}
      setTake={setTake}
    />
  )
}

export default { title: 'Components/TablePagination' }
