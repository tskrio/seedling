export const schema = gql`
  type Task {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    state: String!
  }

  type Query {
    tasks: [Task!]!
    task(id: Int!): Task
  }

  input CreateTaskInput {
    title: String!
    state: String!
  }

  input UpdateTaskInput {
    title: String
    state: String
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: Int!, input: UpdateTaskInput!): Task!
    deleteTask(id: Int!): Task!
  }
`
