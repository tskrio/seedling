module.exports = {
  active: true,
  order: 101,
  when: ['after'],
  operation: ['create'],
  table: 'message',
  file: __filename,
  command: async function ({ data, status }) {
    if (data.entity.includes('fail')) {
      data.entity = data.entity + 9999
      // this here doesnt do an update as it's an after rule...
      // after create rules w/statuscode of !success to direct but WILL have already created the record.
      status.code = 'fail'
      status.message = 'no entity named test'
    }
    return { data, status }
  },
}
