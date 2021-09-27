export const schema = gql`
  type User {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String! @maskedEmail
    name: String!
    preferences: JSON! @requireAuth(roles: ["NOONE"])
    hashedPassword: String! @requireAuth(roles: ["NOONE"])
    salt: String! @requireAuth(roles: ["NOONE"])
    GroupMember: [GroupMember]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth(roles: ["NOONE"])
  }

  input CreateUserInput {
    email: String!
    name: String!
    preferences: JSON!
    hashedPassword: String!
    salt: String!
  }

  input UpdateUserInput {
    email: String
    name: String
    preferences: JSON
    hashedPassword: String
    salt: String
  }
  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
