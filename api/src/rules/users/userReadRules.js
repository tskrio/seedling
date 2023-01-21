module.exports = {
  active: true, //           controls if this runs
  order: 10, //              controls the order this runs
  when: ['before'], //       used to filter rules to run
  operation: ['read'], // used to filter rules to run
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
  command: async function ({ where, cuid }) {
    if (context.currentUser.roles.includes('userRead')) {
      where.push({ cuid: context.currentUser.cuid }) // required for all queries
      //return where
      return { where, cuid }
    }
    where.push({ cuid })

    return { where, cuid }
  },
}
