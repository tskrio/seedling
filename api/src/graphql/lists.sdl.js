export const schema = gql`
  type List {
    table: String!
    page: Int
    take: Int
    where: String
    orderBy: String
    filter: JSON
    order: JSON
    fields: JSON
    select: JSON
    total: Int
    results: [JSON]
  }

  type Form {
    table: String!
    cuid: String
    fields: JSON
    select: JSON
    result: JSON
  }

  type Query {
    readRecords(
      table: String!
      page: Int
      take: Int
      where: String
      orderBy: String
      filter: JSON
      results: [JSON]
    ): List! @requireAuth
    readRecord(table: String!, cuid: String): Form!
      @requireAuth
  }
  type Mutation {
    createRecord(table: String!, data: JSON!): Form!
      @requireAuth
    updateRecord(table: String!, cuid: String!, data: JSON!): Form!
      @requireAuth
    deleteRecord(table: String!, cuid: String!): Form!
      @requireAuth
  }
`
