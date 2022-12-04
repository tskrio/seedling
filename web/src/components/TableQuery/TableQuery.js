import { Fragment, useRef } from 'react'

import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  SimpleGrid,
  IconButton,
  Box,
  Input,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

import { navigate, useLocation } from '@redwoodjs/router'

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
    params.delete('q')
    setQuery('')
    setFuzzyQuery(searchInput.current.value)
    setSkip(0)

    //navigate(link(''))
  }
  let handleClearQuery = () => {
    params.delete('q')
    //setQuery('')
    setFuzzyQuery('')
    setSkip(0)

    //navigate(link(''))
  }
  let handleSearchKeyDown = (event) => {
    //
    if (event.charCode === 13) {
      params.delete('q')
      setFuzzyQuery(searchInput.current.value)
      setSkip(0)

      //navigate(link(''))
    }
  }
  let query = JSON.parse(rawQuery)
  let [ANDQuery, ...ORQuery] = query.AND //TODO: First query is not always the AND.
  // TODO: Parse the query.AND for objects where the first property is,
  //console.log('ANDQuery[0]', ANDQuery)
  //console.log('ANDQuery', ANDQuery, 'ORQuery', ORQuery)
  ORQuery = ORQuery[0]?.OR

  return (
    <Fragment>
      <SimpleGrid columns={1} spacingX="40px" spacingY="20px">
        <Box pt={1} pb={1}>
          <Flex gap={1}>
            <Input
              placeholder={inputPlaceholder || 'Search'}
              ref={searchInput}
              padding="10px"
              defaultValue={fuzzyQuery}
              onKeyPress={handleSearchKeyDown}
              mr={2}
            />
            <IconButton
              aria-label="Search database"
              onClick={handleSearchButton}
              icon={<SearchIcon />}
              colorScheme={'green'}
            />

            <IconButton
              aria-label="Reset Query"
              onClick={handleClearQuery}
              icon={<CloseIcon />}
              colorScheme={'red'}
            />
          </Flex>
        </Box>
        {ANDQuery && (
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => {
                  //console.log('going to ', ANDQuery)
                  //navigate(link(JSON.stringify(ANDQuery)))
                  params.delete('q')
                  setFuzzyQuery('')
                  setSkip(0)

                  navigate(link(''))
                }}
              >
                Required Query = {JSON.stringify(ANDQuery)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
        {ORQuery && (
          <Breadcrumb>
            {ORQuery?.map((orQueryPart, index) => {
              let key = Object.keys(orQueryPart)
              return (
                <BreadcrumbItem key={`orQuery-${index}`}>
                  <BreadcrumbLink
                    onClick={() => {
                      //{ key: orQueryPart[key]?.contains }
                      navigate(
                        link(
                          `{"${key}":{"contains":"${orQueryPart[key]?.contains}"}}`
                        )
                      )
                    }}
                  >
                    {key} CONTAINS {orQueryPart[key]?.contains}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )
            })}
          </Breadcrumb>
        )}
      </SimpleGrid>
    </Fragment>
  )
}

export default TableQuery
