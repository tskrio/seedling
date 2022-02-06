export const schema = gql`
  enum Sort {
    asc
    desc
  }
  type Status {
    code: String
    message: String
  }
  input FilterInput {
    filter: String
  }
  input OrderByInput {
    "on everything"
    id: Sort
    "on everything"
    createdAt: Sort
    "on everything"
    updatedAt: Sort
    "on User"
    email: Sort
    "on User, and Group"
    name: Sort
    "on Preference"
    entity: Sort
    "on Preference"
    value: Sort
    "on GroupRole"
    role: Sort
    "on GroupRole, and GroupMember"
    group: Sort
    "on GroupMember"
    user: Sort
    language: Sort
  }
`
