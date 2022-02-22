import TablePagination from './TablePagination'
import { useState } from 'react'
export const Generated = () => {
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take

  return (
    <TablePagination count={1000} skip={skip} setSkip={setSkip} take={take} />
  )
}

export default { title: 'Components/TablePagination' }
