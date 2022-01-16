export const schema = gql`
  type User {
    "The unique key auto assigned on create"
    id: Int!
    "DateTime set when created by database"
    createdAt: DateTime!
    "DateTime set when updated by database"
    updatedAt: DateTime!
    "The email is used for notifications and authentication"
    email: String! @masked
    "Identifer used for the user"
    name: String!
    "Password that is salted and hashed"
    hashedPassword: String! @masked
    "Random string generated on password change used when hashing password"
    salt: String! @masked
    "String to allow the changing of the password without the password"
    resetToken: String
    "DateTime the resetToken expires"
    resetTokenExpiresAt: DateTime
    GroupMember: [GroupMember]!
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
    email: String!
    name: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    name: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
      @requireAuth(roles: ["userCreate", "admin"])
    updateUser(id: Int!, input: UpdateUserInput!): User!
      @requireAuth(roles: ["userUpdate", "admin"])
    deleteUser(id: Int!): User! @requireAuth(roles: ["userDelete", "admin"])
  }
`
