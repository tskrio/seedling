export const schema = gql`
  type Log {
    id: String!
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

    log(id: String!): Log @requireAuth(roles: ["logRead", "admin"])
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
    updateLog(id: String!, input: UpdateLogInput!): Log!
      @requireAuth(roles: ["logUpdate", "admin"])
    deleteLog(id: String!): Log! @requireAuth(roles: ["logDelete", "admin"])
  }
`
