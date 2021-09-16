export const schema = gql`
  type UserRole {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: Int!
    role: Role!
  }

  enum Role {
    taskCreate
    taskRead
    taskUpdate
    taskDelete
    userCreate
    userRead
    userUpdate
    userDelete
    groupCreate
    groupRead
    groupUpdate
    groupDelete
    groupMemberCreate
    groupMemberRead
    groupMemberUpdate
    groupMemberDelete
    userRoleCreate
    userRoleRead
    userRoleUpdate
    userRoleDelete
  }

  type Query {
    userRoles: [UserRole!]!
    userRole(id: Int!): UserRole
    userRolesForUser(userId: Int!): [UserRole!]!
  }

  input CreateUserRoleInput {
    userId: Int!
    role: Role!
  }

  input UpdateUserRoleInput {
    userId: Int
    role: Role
  }

  type Mutation {
    createUserRole(input: CreateUserRoleInput!): UserRole!
    updateUserRole(id: Int!, input: UpdateUserRoleInput!): UserRole!
    deleteUserRole(id: Int!): UserRole!
  }
`
