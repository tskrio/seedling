import { useQuery } from '@apollo/client'
import { SelectField } from '@redwoodjs/forms'
import { useState } from 'react'

const ReferenceField = ({ field }) => {
  let [filterString, setFitlerString] = useState('')
  const { loading, error, data, refetch } = useQuery(field.QUERY, {
    variables: {
      filter: filterString || '',
    },
  })
  let handleSearchResult = () => {
    refetch()
  }
  let input = (
    <>
      <input
        name={'reference.' + field.name}
        defaultValue={filterString}
        placeholder={'type a name here to filter...'}
        onBlur={(event) => {
          setFitlerString(event.target.value)
        }}
        onChange={() => {}}
      />
      <br />
    </>
  )
  if (loading) return <p>Loading Lazy Data</p>
  if (error) return <p>`Error! ${error}`</p>
  if (data) handleSearchResult(data)

  let options = data.search.results.map((option) => {
    try {
      return (
        <option key={option.id} value={option[field.value]}>
          {option[field.display]}
        </option>
      )
    } catch (error) {
      console.log(error)
    }
  })
  let html = (
    <SelectField name={field.name}>
      <option>Pick one</option>
      {options}
    </SelectField>
  )
  return (
    <div>
      {input}
      {html}
    </div>
  )
  //<input onChange=
}

export default ReferenceField
