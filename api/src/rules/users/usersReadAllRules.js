module.exports = {
  active: true, //           controls if this runs
  order: 10, //              controls the order this runs
  when: ['before'], //       used to filter rules to run
  operation: ['readAll'], // used to filter rules to run
  table: 'user', //         used to filter rules to run
  file: __filename, //       used for logging
  /**
   *
   * @param {Array} where // array of where clauses, if the query Object is just pushed without a preceing "OR" it will be required see
   * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#where
   * where: { AND: [ this is where the local where pushed ]}
   * exampeld if you say i can only see the logged in user
   * where.push({id: myuserId})
   * the executed where will be
   * * where: { AND: [ {id: myuserId},{OR: [{name: ocntains: jace}, {email...}]} ]}
   * if you want to do mutlipled and
   * @param {object} filter // object to look up records
   * @param {object} q // string from URL maybe malformed Object
   * @returns
   */
  command: async function ({ where, filter, q }) {
    if (context.currentUser.roles.includes('userRead')) {
      where.push({ id: context.currentUser.id }) // required for all queries
    }
    if (filter) {
      where.push({
        OR: [
          // not required
          { name: { contains: filter, mode: 'insensitive' } },
          //{ username: { contains: filter, mode: 'insensitive' } },
          { email: { contains: filter, mode: 'insensitive' } },
        ],
      })
    }
    if (q && q.length > 0) {
      try {
        let urlQuery = JSON.parse(q)
        where.push(
          urlQuery
          //OR: [JSON.parse(q)],
        )
      } catch (error) {
        console.error('cannot parse from rule', error)
      }
    }
    return { where }
  },
}
