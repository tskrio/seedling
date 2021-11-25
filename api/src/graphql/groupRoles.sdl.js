export const schema = gql`
  "A group role is a role that is given to the group's members"
  type GroupRole {
    "The unique key auto assigned on create"
    id: Int!
    "DateTime set when created by database"
    createdAt: DateTime!
    "DateTime set when updated by database"
    updatedAt: DateTime!
    "The role is just a string, when this was an enum I had lots of problems"
    role: String!
    "The related group for this role"
    group: Group!
    "The group's ID"
    groupId: Int!
  }

  type GroupRoles {
    results: [GroupRole!]!
    count: Int!
    take: Int!
    skip: Int!
  }

  type Query {
    "To see GroupRoles you must be authenticated with groupRoleRead role"
    groupRoles(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
    ): GroupRoles! @requireAuth(roles: ["groupRoleRead", "admin"])
    "To see GroupRoles you must be authenticated with groupRoleRead role"
    groupRole(id: Int!): GroupRole
      @requireAuth(roles: ["groupRoleRead", "admin"])
    """
    To see GroupRoles you must be authenticated with groupRoleRead role
    There's probably a better way to do this but for the time being I've made
    this query to look up roles by groupId.  Used during authentication
    """
    groupRolesByGroup(id: Int!): [GroupRole!]!
      @requireAuth(roles: ["groupRoleRead", "admin"])
  }

  "When creating a group both the Role and the Group ID is needed."
  input CreateGroupRoleInput {
    "Role is string that is given access to rights and is required"
    role: String!
    "Group ID is required"
    groupId: Int!
  }
  "When updating a GroupRole you can only set role, and group ID optionally"
  input UpdateGroupRoleInput {
    "Role is string that is given access to rights and is optional"
    role: String
    "Group ID is optional"
    groupId: Int
  }

  type Mutation {
    "To create a group role you must be authenticated with role groupRoleCreate"
    createGroupRole(input: CreateGroupRoleInput!): GroupRole!
      @requireAuth(roles: ["groupRoleCreate", "admin"])
    "To update a group role you must be authenticated with role groupRoleUpdate"
    updateGroupRole(id: Int!, input: UpdateGroupRoleInput!): GroupRole!
      @requireAuth(roles: ["groupRoleUpdate", "admin"])
    "To delete a group role you must be authenticated with role groupRoleDelete"
    deleteGroupRole(id: Int!): GroupRole!
      @requireAuth(roles: ["groupRoleDelete", "admin"])
  }
`
