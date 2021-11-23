import { createTransformerDirective } from '@redwoodjs/graphql-server'

export const schema = gql`
  directive @masked on FIELD_DEFINITION
`

const transform = ({ resolvedValue }) => {
  let resolvedValueArr = resolvedValue.split('@')
  let returnValue = resolvedValueArr.map((part, index) => {
    if (index === 0) {
      return part.replace(/[a-zA-Z0-9\+\.]/gi, '*')
    } else {
      return part
    }
  })
  return returnValue.join('@')
}

const masked = createTransformerDirective(schema, transform)

export default masked
