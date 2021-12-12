import { navigate, useLocation, Link } from '@redwoodjs/router'
import { Fragment, useRef } from 'react'
import {
  SimpleGrid,
  IconButton,
  Box,
  Input,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const TableQuery = ({
  setQuery,
  fuzzyQuery,
  setFuzzyQuery,
  rawQuery,
  inputPlaceholder,
  link,
  setSkip,
}) => {
  const { search } = useLocation()

  let params = new URLSearchParams(search)
  let searchInput = useRef('')
  let handleSearchButton = () => {
    console.log(`searching for ${searchInput.current.value}`)
    setFuzzyQuery(searchInput.current.value)
    setSkip(0)
  }
  let handleSearchKeyDown = (event) => {
    //
    if (event.charCode === 13) {
      setFuzzyQuery(searchInput.current.value)
      setSkip(0)
    }
  }

  return (
    <Fragment>
      <SimpleGrid columns={1} spacingX="40px" spacingY="20px">
        <Box padding="5px" height="160px">
          <Flex padding="10px">
            <Input
              placeholder={inputPlaceholder || 'Search'}
              ref={searchInput}
              padding="10px"
              defaultValue={fuzzyQuery}
              onKeyPress={handleSearchKeyDown}
            />
            <IconButton
              aria-label="Search database"
              onClick={handleSearchButton}
              icon={<SearchIcon />}
            />
          </Flex>
          <Flex padding="10px">
            <Link to={link(rawQuery || '')}>
              <Text>{rawQuery || 'All Users'}</Text>
            </Link>
            <Button
              onClick={() => {
                console.log(params.get('q'))
                params.delete('q')
                setQuery('')
                setFuzzyQuery('')
                navigate(link(''))
              }}
              colorScheme="red"
              variant="solid"
              type="button"
              size="xs"
            >
              Clear Query
            </Button>
          </Flex>
          <Text color="white">{fuzzyQuery.toString()}</Text>
        </Box>
      </SimpleGrid>
    </Fragment>
  )
}

export default TableQuery
