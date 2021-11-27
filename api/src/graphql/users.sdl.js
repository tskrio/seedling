export const schema = gql`
  "A account that can be associated to a group and preferences"
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
    "Calculated field, not actually stored on the database"
    md5Email: String!
    "The memberships this user is a part of"
    GroupMember: [GroupMember]!
    "The preferences this user has"
    Preference: [Preference]!
  }

  type Users {
    results: [User!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  "A collection of queries from user"
  type Query {
    "To see Users you must be authenticated and have userRead role"
    users(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Users! @requireAuth(roles: ["userRead", "admin"])
    "To see Users you must be authenticated and have userRead role"
    user(id: Int!): User @requireAuth(roles: ["userRead", "admin"])
  }

  input CreateUserInput {
    "The email assocated to the account"
    email: String!
    "The name used with the account (used for display purposes)"
    name: String!
    "The salted and hashed password.  When changing it, a rule salts and hashes this."
    hashedPassword: String!
    "The salt is used to encrypt the password and is changed when the password is changed."
    salt: String
  }

  input UpdateUserInput {
    "The email assocated to the account"
    email: String
    "The name used with the account (used for display purposes)"
    name: String
    "The salted and hashed password.  When changing it, a rule salts and hashes this."
    hashedPassword: String
    "The salt is used to encrypt the password and is changed when the password is changed."
    salt: String
  }
  type Mutation {
    "To create Users you must be authenticated and have userCreate role"
    createUser(input: CreateUserInput!): User!
      @requireAuth(roles: ["userCreate", "admin"])
    "To update Users you must be authenticated and have userUpdate role"
    updateUser(id: Int!, input: UpdateUserInput!): User
      @requireAuth(roles: ["userUpdate", "admin"])
    "To delete Users you must be authenticated and have userDelete role"
    deleteUser(id: Int!): User! @requireAuth(roles: ["userDelete", "admin"])
  }
`
