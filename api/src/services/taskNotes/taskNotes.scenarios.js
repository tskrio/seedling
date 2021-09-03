export const standard = defineScenario({
  taskNote: {
    one: {
      updatedAt: '2021-08-13T19:10:42Z',
      note: 'String',
      task: {
        create: {
          updatedAt: '2021-08-13T19:10:42Z',
          title: 'String',
          createdBy: {
            create: {
              updatedAt: '2021-08-13T19:10:42Z',
              email: 'String3906065',
            },
          },
        },
      },

      User: {
        create: { updatedAt: '2021-08-13T19:10:42Z', email: 'String3181957' },
      },
    },

    two: {
      updatedAt: '2021-08-13T19:10:42Z',
      note: 'String',
      task: {
        create: {
          updatedAt: '2021-08-13T19:10:42Z',
          title: 'String',
          createdBy: {
            create: {
              updatedAt: '2021-08-13T19:10:42Z',
              email: 'String7801819',
            },
          },
        },
      },

      User: {
        create: { updatedAt: '2021-08-13T19:10:42Z', email: 'String6717648' },
      },
    },
  },
})
