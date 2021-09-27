import {
  createTransformerDirective,
  TransformerDirectiveFunc,
} from '@redwoodjs/graphql-server'

export const schema = gql`
  directive @maskedEmail on FIELD_DEFINITION
`

const transform: TransformerDirectiveFunc = ({
  /*context,*/ resolvedValue,
}) => {
  return resolvedValue.replace(/[a-zA-Z0-9]/gi, '*')
}

const maskedEmail = createTransformerDirective(schema, transform)

export default maskedEmail
