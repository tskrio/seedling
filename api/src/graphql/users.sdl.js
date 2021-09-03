export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String!
    hashedPassword: String!
    salt: String!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  input CreateUserInput {
    email: String!
    hashedPassword: String!
    salt: String!
  }

  input UpdateUserInput {
    email: String
    hashedPassword: String
    salt: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
  }
`
