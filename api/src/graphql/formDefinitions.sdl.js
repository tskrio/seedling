export const schema = gql`
  type FormDefinition {
    cuid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: String
    updatedBy: String
    table: String!
    title: String!
    content: String!
  }

  type Query {
    formDefinitions: [FormDefinition!]! @requireAuth
    formDefinition(cuid: String!): FormDefinition @requireAuth
    formDefinitionByTable(table: String!): FormDefinition @requireAuth
  }

  input CreateFormDefinitionInput {
    cuid: String!
    createdBy: String
    updatedBy: String
    table: String!
    title: String!
    content: String!
  }

  input UpdateFormDefinitionInput {
    cuid: String
    createdBy: String
    updatedBy: String
    table: String
    title: String
    content: String
  }

  type Mutation {
    createFormDefinition(input: CreateFormDefinitionInput!): FormDefinition!
      @requireAuth
    updateFormDefinition(
      cuid: String!
      input: UpdateFormDefinitionInput!
    ): FormDefinition! @requireAuth
    deleteFormDefinition(cuid: String!): FormDefinition! @requireAuth
  }
`
