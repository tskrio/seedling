import { log } from 'src/lib/util'

module.exports = {
  active: true, //           controls if this runs
  order: 10, //              controls the order this runs
  when: ['before'], //       used to filter rules to run
  operation: ['readAll'], // used to filter rules to run
  table: 'groupMember', //         used to filter rules to run
  file: __filename, //       used for logging
  command: async function ({ where, filter, q }) {
    if (filter) {
      where.push({
        OR: [
          // not required
          { user: { name: { contains: filter, mode: 'insensitive' } } },
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
        log('cannot parse from rule - groupMembersReadAllRules')
      }
    }
    return { where }
  },
}
