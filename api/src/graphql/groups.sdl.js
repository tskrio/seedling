export const schema = gql`
  type Group {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    description: String!
    GroupRole: [GroupRole]
    GroupMember: [GroupMember]!
  }

  type Query {
    groups: [Group!]!
    group(id: Int!): Group
  }

  input CreateGroupInput {
    name: String!
    description: String!
  }

  input UpdateGroupInput {
    name: String
    description: String
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group!
    updateGroup(id: Int!, input: UpdateGroupInput!): Group!
    deleteGroup(id: Int!): Group!
  }
`
