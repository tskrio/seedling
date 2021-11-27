export const schema = gql`
  "A membership from a group to a user"
  type GroupMember {
    "The unique key auto assigned on create"
    id: Int!
    "DateTime set when created by database"
    createdAt: DateTime!
    "DateTime set when updated by database"
    updatedAt: DateTime!
    "The related user"
    user: User!
    "The user's ID"
    userId: Int!
    "The related group"
    group: Group!
    "The group's ID"
    groupId: Int!
  }

  type GroupMembers {
    results: [GroupMember!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    "To see GroupMembers you must be authenticated and have groupMemberRead role"
    groupMembers(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): GroupMembers! @requireAuth(roles: ["groupMemberRead", "admin"])
    "To see GroupMembers you must be authenticated and have groupMemberRead role"
    groupMember(id: Int!): GroupMember
      @requireAuth(roles: ["groupMemberRead", "admin"])
    """
    To see GroupMembers you must be authenticated and have groupMemberRead role
    There's probably a better way to do this but for the time being I've made
    this query to look up memberships by groupId
    """
    groupMembersByGroup(
      id: Int!
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
    ): GroupMembers! @requireAuth(roles: ["groupMemberRead", "admin"])
    """
    To see GroupMembers you must be authenticated and have groupMemberRead role
    There's probably a better way to do this but for the time being I've made
    this query to look up memberships by userId
    """
    groupMembersByUser(id: Int!): GroupMembers!
      @requireAuth(roles: ["groupMemberRead", "admin"])
  }

  "When creating a group member all both user and group are needed"
  input CreateGroupMemberInput {
    "The user id is required"
    userId: Int!
    "The group id is required"
    groupId: Int!
  }

  "Really this, should not be happening but, there's a role for it, so why not"
  input UpdateGroupMemberInput {
    "The user id is optional"
    userId: Int
    "The group id is optional"
    groupId: Int
  }

  type Mutation {
    "To create Groups you must be authenticated and have groupMemberCreate role"
    createGroupMember(input: CreateGroupMemberInput!): GroupMember!
      @requireAuth(roles: ["groupMemberCreate", "admin"])
    "To update Groups you must be authenticated and have groupMemberUpdate role"
    updateGroupMember(id: Int!, input: UpdateGroupMemberInput!): GroupMember!
      @requireAuth(roles: ["groupMemberUpdate", "admin"])
    "To update Groups you must be authenticated and have groupMemberDelete role"
    deleteGroupMember(id: Int!): GroupMember!
      @requireAuth(roles: ["groupMemberDelete", "admin"])
  }
`
