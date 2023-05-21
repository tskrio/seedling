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
    ): List! @requireAuth(roles: ["activityRead", "admin"])
    readRecord(table: String!, cuid: String): Form!
      @requireAuth(roles: ["activityRead", "admin"])
  }
  type Mutation {
    createRecord(table: String!, data: JSON!): Form!
      @requireAuth(roles: ["activityCreate", "admin"])
    updateRecord(table: String!, cuid: String!, data: JSON!): Form!
      @requireAuth(roles: ["activityUpdate", "admin"])
    deleteRecord(table: String!, cuid: String!): Form!
      @requireAuth(roles: ["activityDelete", "admin"])
  }
`
