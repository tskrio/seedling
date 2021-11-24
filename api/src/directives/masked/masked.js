import { createTransformerDirective } from '@redwoodjs/graphql-server'

export const schema = gql`
  directive @masked on FIELD_DEFINITION
`

const transform = ({ resolvedValue }) => {
  return resolvedValue.replace(/[a-zA-Z0-9\+\.]/gi, '*')
}

const masked = createTransformerDirective(schema, transform)

export default masked
