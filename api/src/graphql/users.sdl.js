export const schema = gql`
  type User {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    "Used to auth for Auth0 OR dbAuth"
    username: String! @masked
    email: String @masked
    "Used to encrypt password with dbAuth"
    salt: String @masked
    """
    loginToken: String @masked"
    "Used to reset password with dbAuth
    """
    loginTokenExpiresAt: DateTime
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
    ): Users! @requireAuth(roles: ["admin"])

    user(cuid: String!): User @requireAuth(roles: ["admin"])
  }

  input CreateUserInput {
    username: String!
    name: String!
    email: String
    salt: String
    """
    loginToken: String
    """
    loginTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    username: String
    name: String
    email: String
    salt: String
    """
    loginToken: String
    """
    loginTokenExpiresAt: DateTime
  }

  type userTokenResponse {
    message: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
      @requireAuth(roles: ["userCreate", "admin"])
    updateUser(cuid: String!, input: UpdateUserInput!): User!
      @requireAuth(roles: ["userUpdate", "admin"])
    deleteUser(cuid: String!): User!
      @requireAuth(roles: ["userDelete", "admin"])
    generateLoginToken(email: String!): userTokenResponse! @skipAuth
  }
`
