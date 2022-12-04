import Chance from 'chance'

const dotenv = require('dotenv')
dotenv.config()

const chance = new Chance()
let total = 100
let _users = []
while (_users.length < total) {
  let name = chance.name()
  let [firstName, lastName] = name.split(' ')
  _users.push({
    name: name,
    username: `${firstName}.${lastName}`.toLowerCase(),
    email: `${firstName}.${lastName}@example.com`.toLowerCase(),
    hashedPassword:
      '5f5f56d40b9ae6bf2abfd7804e97e607f9d7432feebb6371849f2676a5058999',
    salt: '881aed4f5703af38eaaab6e788d8e860',
    Preference: {
      create: {
        entity: 'language',
        value: chance.pickone(['en', 'fr', 'es', 'de']),
      },
    },
  })
}
if (process.env.AUTH0_DOMAIN) {
  _users = _users.map((user, index) => {
    let subjectNumber = 1234567890
    return {
      name: user.name,
      email: user.email,
      username: `${chance.pickone([
        'acme',
        'globex',
        'soylent',
        'initech',
        'umbrella',
        'hooli',
        'vehement',
        'massive-dynamic',
      ])}-oauth2|${subjectNumber - index}`,
      Preference: user.Preference,
    }
  })
}
export const users = (() => {
  if (process.env.AUTH0_DOMAIN) {
    console.log('auth0_domain defined....')
    return []
  } else {
    console.log('auth0_domain not defined')
    return [
      {
        name: 'Adam Admin',
        username: 'admin',
        email: 'admin@example.com',
        hashedPassword:
          '5f5f56d40b9ae6bf2abfd7804e97e607f9d7432feebb6371849f2676a5058999',
        salt: '881aed4f5703af38eaaab6e788d8e860',
        GroupMember: {
          create: {
            groupId: 1,
          },
        },
      },
      {
        name: 'Mike Manager',
        username: 'manager',
        email: 'manager@example.com',
        hashedPassword:
          '4536e33d926d3ea79cfed471a61b679041231cc132f672362aca1554fbba88cf',
        salt: '881aed4f5703af38eaaab6e788d8e860',
        GroupMember: {
          create: {
            groupId: 2,
          },
        },
      },
      {
        name: 'Eve Employee',
        username: 'employee',
        email: 'employee@example.com',
        hashedPassword:
          '01328ad2d2463d077f3e2f5dace839eff9eaf86e6d41b2d579df8c33a552f594',
        salt: '3e6780c35a4e5ad17aafc7a6230b1163',
        GroupMember: {
          create: {
            groupId: 3,
          },
        },
      },
      {
        name: 'Tron',
        username: 'tron',
        email: 'tron@encom.com',
        hashedPassword:
          '01328ad2d2463d077f3e2f5dace839eff9eaf86e6d41b2d579df8c33a552f594',
        salt: '3e6780c35a4e5ad17aafc7a6230b1163',
      },
    ]
  }
})()
console.log(_users[0])
_users.push({})
export const bulkUsers = _users
