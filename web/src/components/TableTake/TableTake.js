import { Select } from '@chakra-ui/react'

const TableTake = ({ take, setTake }) => {
  let handleTakeInput = (event) => {
    setTake(parseInt(event.target.value, 10))
  }
  return (
    <Select onChange={handleTakeInput}>
      <option value={take}>Show {take}</option>
      {take != 10 && <option value="10">Show 10</option>}
      {take != 20 && <option value="20">Show 20</option>}
      {take != 50 && <option value="50">Show 50</option>}
      {take != 100 && <option value="100">Show 100</option>}
    </Select>
  )
}

export default TableTake
