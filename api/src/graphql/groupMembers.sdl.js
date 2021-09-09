export const schema = gql`
  type GroupMember {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    userId: Int!
    group: Group!
    groupId: Int!
    GroupRole: [GroupRole]
  }

  type Query {
    groupMembers: [GroupMember!]!
    groupMember(id: Int!): GroupMember
    groupMembersByGroup(id: Int!): [GroupMember!]!
  }

  input CreateGroupMemberInput {
    userId: Int!
    groupId: Int!
  }

  input UpdateGroupMemberInput {
    userId: Int
    groupId: Int
  }

  type Mutation {
    createGroupMember(input: CreateGroupMemberInput!): GroupMember!
    updateGroupMember(id: Int!, input: UpdateGroupMemberInput!): GroupMember!
    deleteGroupMember(id: Int!): GroupMember!
  }
`
