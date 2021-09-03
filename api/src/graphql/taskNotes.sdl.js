export const schema = gql`
  type TaskNote {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String!
    task: Task!
    taskId: Int!
    User: User!
    userId: Int!
  }

  type Query {
    taskNotes: [TaskNote!]!
  }

  input CreateTaskNoteInput {
    note: String!
    taskId: Int!
    userId: Int!
  }

  input UpdateTaskNoteInput {
    note: String
    taskId: Int
    userId: Int
  }
`
