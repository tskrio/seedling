import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowUpDownIcon,
} from '@chakra-ui/icons'
import { Button, Th, Thead, Tr } from '@chakra-ui/react'

import { ListContext } from 'src/App.js'
const ListRowHeader = ({ fields }) => {
  const { page, setPage, take, setTake, orderBy, setOrderBy } =
    React.useContext(ListContext)
  return (
    <Thead>
      <Tr>
        <Th></Th>
        {fields.map((field, index) => {
          // if the field is currently sorted define it
          let sortLabel = <ArrowUpDownIcon />
          let orderByField = orderBy?.split('/')[0]
          let orderByDirection = orderBy?.split('/')[1]
          if (orderByField === field.name) {
            sortLabel =
              orderByDirection === 'asc' ? (
                <ChevronUpIcon />
              ) : (
                <ChevronDownIcon />
              )
          }
          if (!field.definition.canSort) {
            return <Th key={index}>{field.definition.label}</Th>
          }
          if (field.definition.canSort) {
            return (
              <Th key={index}>
                {field.definition.label}
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (orderByField === field.name) {
                      // toggle the direction
                      if (orderByDirection === 'asc') {
                        setOrderBy(`${field.name}/desc`)
                      }
                      if (orderByDirection === 'desc') {
                        setOrderBy(`${field.name}/asc`)
                      }
                    } else {
                      // set the direction to ASC
                      setOrderBy(`${field.name}/asc`)
                    }
                  }}
                >
                  {sortLabel}
                </Button>
              </Th>
            )
          }
        })}
      </Tr>
    </Thead>
  )
}

export default ListRowHeader
