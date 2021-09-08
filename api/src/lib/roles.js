export const matrix = {
  task: {
    create: ['createTask', 'admin'],
    read: ['readTask', 'admin'],
    update: ['updateTask', 'admin'],
    delete: ['deleteTask', 'admin'],
  },
  user: {
    create: ['createUser', 'admin'],
    read: ['readUser', 'admin'],
    update: ['updateUser', 'admin'],
    delete: ['deleteUser', 'admin'],
  },
  groupMember: {
    create: ['createGroupMember', 'admin'],
    read: ['readGroupMember', 'admin'],
    update: ['updateGroupMember', 'admin'],
    delete: ['deleteGroupMember', 'admin'],
  },
}
