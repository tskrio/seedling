import { useState } from 'react'

import { useQuery } from '@apollo/client'
//import { SelectField } from '@redwoodjs/forms'
import {
  Select,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Flex,
  Text,
} from '@chakra-ui/react'
import { MdFilterAlt } from 'react-icons/md'
const ReferenceField = ({ field, register }) => {
  let [searchVisible, setSearchVisible] = useState(false)
  let defaultOption = (
    <>
      {field.defaultValue && field.defaultDisplay && (
        <option value={field.defaultValue}>{field.defaultDisplay}</option>
      )}
    </>
  )
  let [filterString, setFitlerString] = useState('')
  const { loading, error, data /*, refetch*/ } = useQuery(field.QUERY, {
    variables: {
      filter: filterString || '',
      skip: 0,
      take: 10,
    },
  })
  let handleSearchResult = () => {
    //    refetch()
  }
  if (loading) {
    //return <p>Loading Lazy Data</p>
  }
  if (error) {
    //return <p>`Error! ${error}`</p>
  }
  if (data) {
    handleSearchResult(data)
  }
  let options = data?.search?.results?.map((option) => {
    try {
      if (option[field.value] !== field.defaultValue) {
        return (
          <option key={option.id} value={option[field.value]}>
            {option[field.display]} - {option[field.value]}
          </option>
        )
      }
    } catch (error) {
      console.error(error)
    }
  })
  let toggleSearch = () => {
    setSearchVisible(!searchVisible)
  }
  return (
    <Flex pt={field.pt}>
      <FormControl key={field.name}>
        <FormLabel htmlFor={field.name}>
          <Flex>
            <Text>{field.prettyName}</Text>

            <IconButton
              ml={2}
              mr={2}
              size={'sm'}
              aria-label="Filter"
              icon={<MdFilterAlt />}
              onClick={toggleSearch}
            />
            {searchVisible && (
              <Input
                size={'sm'}
                name={'reference.' + field.name}
                defaultValue={filterString}
                placeholder={'type a name here to filter...'}
                onBlur={(event) => {
                  setFitlerString(event.target.value)
                }}
                onChange={() => {}}
              />
            )}
          </Flex>
        </FormLabel>

        <Select
          defaultValue={field.defaultValue}
          id={field.name}
          name={field.name}
          {...register(field.name, {
            required: field?.required || false,
            minLength: field.minLength,
          })}
        >
          <option>Pick one</option>
          {defaultOption}
          {options}
        </Select>
      </FormControl>
    </Flex>
  )
  //  return <p>{input}</p>
}

export default ReferenceField
