module.exports = {
  active: false, //           controls if this runs
  order: 10, //              controls the order this runs
  when: ['after'], //        used to filter rules to run
  operation: ['read'], //    used to filter rules to run
  table: 'user', //          used to filter rules to run
  file: __filename, //       used for logging
  command: async function ({ data }) {
    if (data?.name.toLowerCase().includes('adam')) {
      data.name = 'not adam - hidden by rule'
    }
    //if (data?.someDate) {
    data.someDate = {
      canView: true,
      canEdit: false,
      value: 'hello',
      displayValue: '',
    }
    //}

    return { data }
  },
}
