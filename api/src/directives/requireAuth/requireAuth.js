import gql from 'graphql-tag'

import { createValidatorDirective } from '@redwoodjs/graphql-server'

import { requireAuth as applicationRequireAuth } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

export const schema = gql`
  directive @requireAuth(roles: [String]) on FIELD_DEFINITION
`

const validate = ({ directiveArgs }) => {
  const { roles } = directiveArgs

  applicationRequireAuth({ roles })
}

const requireAuth = createValidatorDirective(schema, validate)

export default requireAuth
