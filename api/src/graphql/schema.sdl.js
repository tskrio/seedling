export const schema = gql`
  type Field {
    name: String!
    kind: String!
    isList: Boolean!
    isRequired: Boolean!
    isUnique: Boolean!
    isId: Boolean!
    isReadOnly: Boolean!
    hasDefaultValue: Boolean!
    type: String!
    default: String
    isGenerated: Boolean!
    isUpdatedAt: Boolean!
    definition: FieldDefinition
  }
  type FieldDefinition {
    name: String
    label: String
    order: Int
    flags: [FieldFlag!]
    attributes: [FieldAttribute!]
  }
  type FieldFlag {
    name: String
    value: Boolean
  }
  type FieldAttribute {
    name: String
    value: String
  }
  type Fields {
    table: String!
    results: [Field!]!
  }
  type Query {
    schema(
      table: String!
    ): Fields! @skipAuth
  }
`
