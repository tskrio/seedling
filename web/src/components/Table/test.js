var rows = [{
    "__typename": "GroupMember",
    "id": 1,
    "createdAt": "2021-09-23T06:08:40.595Z",
    "updatedAt": "2021-09-23T06:08:40.595Z",
    "userId": 1,
    "groupId": 1,
    "user": {
        "__typename": "User",
        "name": "Admin",
        "id": 1
    },
    "group": {
        "__typename": "Group",
        "name": "Administrators",
        "id": 1,
        "createdAt": "2021-09-23T06:08:40.323Z",
        "updatedAt": "2021-09-23T06:08:40.324Z",
        "description": "Users with admin privileges"
    }
}]
row = rows[0];
const getProps = (path, context) => {
    console.log('started getprops')
        context = context || this
    path = path.split('.')
    path.forEach((pathString, index) => {
        console.log('?',context, path, index, path[index]);
        context = context[path[index]]
    })
    return context
}
let tableCell = (type, row, key) => {
    console.log('type', key);
    if (type === 'reference') {
        let parts = key.split('.');
        return row[key[0]][key[1]]
    } else if (type === 'date') {
        return timeTag(row[key])
    } else if (type === 'boolean') {
        return row[key] ? 'Yes' : 'No'
    } else if (type === 'referenceString') {
        console.log('got to else if refrencestring');
        return getProps(key, row)
    } else {
        return row[key]
    }
}
tableCell('refrenceString', row, 'user.name');