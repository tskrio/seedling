export const schema = gql`
  type Message {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    language: String!
    entity: String!
    value: String!
  }

  type Messages {
    results: [Message!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    messages(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Messages! @requireAuth(roles: ["messageRead", "admin"])

    message(id: Int!): Message @requireAuth(roles: ["messageRead", "admin"])
  }

  input CreateMessageInput {
    language: String!
    entity: String!
    value: String!
  }

  input UpdateMessageInput {
    language: String
    entity: String
    value: String
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Message!
      @requireAuth(roles: ["messageCreate", "admin"])
    updateMessage(id: Int!, input: UpdateMessageInput!): Message!
      @requireAuth(roles: ["messageUpdate", "admin"])
    deleteMessage(id: Int!): Message!
      @requireAuth(roles: ["messageDelete", "admin"])
  }
`
