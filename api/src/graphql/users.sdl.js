export const schema = gql`
  type User {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    "Used to auth for Auth0 OR dbAuth"
    username: String! @masked
    email: String @masked
    "Used to encrypt password with dbAuth"
    salt: String @masked
    hashedPassword: String @masked
    "Used to reset password with dbAuth"
    resetToken: String @masked
    "Controls how long a reset token is good for with dbAuth"
    resetTokenExpiresAt: DateTime
    GroupMember: [GroupMember]!
      @requireAuth(roles: ["groupMemberRead", "admin"])
    Preference: [Preference]!
  }

  type Users {
    results: [User!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    users(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Users! @requireAuth(roles: ["userRead", "admin"])

    user(id: Int!): User @requireAuth(roles: ["userRead", "admin"])
  }

  input CreateUserInput {
    username: String!
    name: String!
    email: String
    salt: String
    hashedPassword: String
  }

  input UpdateUserInput {
    username: String
    name: String
    email: String
    salt: String
    hashedPassword: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
      @requireAuth(roles: ["userCreate", "admin"])
    updateUser(id: Int!, input: UpdateUserInput!): User!
      @requireAuth(roles: ["userUpdate", "admin"])
    deleteUser(id: Int!): User! @requireAuth(roles: ["userDelete", "admin"])
  }
`
