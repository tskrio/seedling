module.exports = {
  active: true, //           controls if this runs
  order: 10, //              controls the order this runs
  when: ['before'], //       used to filter rules to run
  operation: ['readAll'], // used to filter rules to run
  table: 'groupRole', //         used to filter rules to run
  file: __filename, //       used for logging
  command: async function ({ where, filter, q }) {
    // if (!context.currentUser.roles.includes('admin')) {
    //   where.push({ entity: 'jace' }) // required for all queries
    // }
    if (filter) {
      where.push({
        OR: [
          // not required
          { role: { contains: filter, mode: 'insensitive' } },
          { group: { name: { contains: filter, mode: 'insensitive' } } },
        ],
      })
    }
    if (q && q.length > 0) {
      try {
        where.push({
          OR: [JSON.parse(q)],
        })
      } catch (error) {
        console.log('cannot parse from rule', error)
      }
    }
    return { where }
  },
}
