export const schema = gql`
  type Log {
    cuid: String!
    createdAt: DateTime!
    message: String!
    source: String!
    context: JSON!
  }

  type Logs {
    results: [Log!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    logs(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Logs! @requireAuth(roles: ["logRead", "admin"])

    log(cuid: String!): Log @requireAuth(roles: ["logRead", "admin"])
  }

  input CreateLogInput {
    message: String!
    source: String!
    context: String!
  }

  input UpdateLogInput {
    message: String
    source: String
    context: String
  }

  type Mutation {
    createLog(input: CreateLogInput!): Log!
      @requireAuth(roles: ["logCreate", "admin"])
    updateLog(cuid: String!, input: UpdateLogInput!): Log!
      @requireAuth(roles: ["logUpdate", "admin"])
    deleteLog(cuid: String!): Log! @requireAuth(roles: ["logDelete", "admin"])
  }
`
