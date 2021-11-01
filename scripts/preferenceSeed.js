import users from './users'

let preferenceId = 1
let _preferences = [
  {
    name: 'sideBarNav.users.display',
    display: 'Side Bar Navigation - Users',
    value: false,
  },
  {
    name: 'sideBarNav.groupMembers.display',
    display: 'Side Bar Navigation - Group Members',
    value: false,
  },
]
let preferenceSeed = users.map((user) => {
  //console.log(user.name)
  return preferences.map((preference) => {
    //console.log(`  ${preference.name}`)
    return {
      id: preferenceId++,
      userId: user.id,
      name: preference.name,
      display: preference.display,
      value: preference.value,
    }
  })
})

export const preferences = preferenceSeed
