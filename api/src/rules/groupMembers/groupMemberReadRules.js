module.exports = {
  active: true, //           controls if this runs
  order: 10, //              controls the order this runs
  when: ['before'], //       used to filter rules to run
  operation: ['read'], // used to filter rules to run
  table: 'groupMember', //         used to filter rules to run
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
  command: async function ({ status, where, id }) {
    // if admin or groupMemberRead, return the record
    // status.code = 'NOOOOOOO'
    // return
    let roles = context.currentUser.roles
    if (roles.includes('admin') || roles.includes('groupMemberRead')) {
      // 'user has roles to see all members of'
      where.push({ id })
      return { where }
    }
    // otherwise if the user has this membership, return it
    if (
      context.currentUser.GroupMember.filter((membership) => {
        return id === membership.id
      }).length === 0
    ) {
      status.code = 'hacking!?'
      status.message = 'you cannot look at others memberships'
      return { status }
    }
    // otherwise
    return { status, where }
  },
}
