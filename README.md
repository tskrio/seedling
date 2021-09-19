
# TskrBase

TskrBase is a open source system to allow for users, groups, and roles
to be managed in one system. The idea here is, Start with this
repository and add the tables you need to track.

## Features

### Pages

- [x] DONE: Signup (generated)
- [x] DONE: Login (custom)
- [ ] [WORK NOT STARTED: Logout](https://github.com/tskrio/tskrBase/issues/2)
- [x] DONE: About
- [x] DONE: NotFound
- [ ] [WORK IN PROGRESS: Home](https://github.com/tskrio/tskrBase/issues/3)
- [ ] [WORK IN PROGRESS: Settings](https://github.com/tskrio/tskrBase/issues/6)
### Components

- [x] DONE: LoginComponent
- [ ] [WORK NOT STARTED: EnumSelect (reusable)](https://github.com/tskrio/tskrBase/issues/7)
- [ ] [WORK NOT STARTED: QuerySelect](https://github.com/tskrio/tskrBase/issues/8)
- [ ] [WORK IN PROGRESS: AsideNavigator](https://github.com/tskrio/tskrBase/issues/9)
- [ ] WORK IN PROGRESS: RoleSelectCell (iterates over enum, make this more generic, replace with EnumSelect)
- [ ] WORK IN PROGRESS: UserSelectCell (iterates over User, make this more generic, replace with QuerySelect)
- [ ] [WORK NOT STARTED: ListCell (reusable) will replace TablePluralCell components](https://github.com/tskrio/tskrBase/issues/10)

### Layouts

- [x] [Standard Layout (reusable)](https://github.com/tskrio/tskrBase/issues/5)

### Base Tables

- [ ] User
- [ ] Group
- [ ] Role
- [ ] GroupRole
- [ ] UserRole
- [ ] GroupMember

### Role Based Access Control

For each table secure Routes, Services, and Components.
https://github.com/tskrio/tskrBase/issues/11

- [ ] User
- [ ] Group
- [ ] Role
- [ ] GroupRole
- [ ] UserRole
- [ ] GroupMember


### Logic Rules

For each service add before and after rules
- [ ] [User](https://github.com/tskrio/tskrBase/issues/12)
  - [ ] [deleteRelatedUserRolesBeforeDelete](https://github.com/tskrio/tskrBase/issues/17)
  - [ ] [deleteRelatedGroupMembershipsBeforeDelete](https://github.com/tskrio/tskrBase/issues/18)
- [ ] [Group](https://github.com/tskrio/tskrBase/issues/13)
  - [ ] [removeGroupRolesBeforeDelete](https://github.com/tskrio/tskrBase/issues/19)
- [ ] [GroupRole](https://github.com/tskrio/tskrBase/issues/14)
  - [ ] [addRolesToUsersAfterCreate](https://github.com/tskrio/tskrBase/issues/20)
  - [ ] [removeRolesFromUsersAfterDelete](https://github.com/tskrio/tskrBase/issues/21)
- [ ] [UserRole](https://github.com/tskrio/tskrBase/issues/15)
  - [ ] [disallowDeleteIfRoleFromGroupBeforeDelete](https://github.com/tskrio/tskrBase/issues/22)
- [ ] [GroupMember](https://github.com/tskrio/tskrBase/issues/16)
  - [ ] [addRolesToUserAfterCreate](https://github.com/tskrio/tskrBase/issues/23)
  - [ ] [removeRolesFromUserAfterDelete](https://github.com/tskrio/tskrBase/issues/24)

### Form Abstraction

- [ ] Think about this will work
## Contributing

Contributions are always welcome!

We follow the [Github Flow], we're still new to this so bear with us.

We review Pull Requests on Mondays and Wednesdays.

If you would like to work on an issue comment on it.

[Github Flow]: https://guides.github.com/introduction/flow/
## Run Locally

### Clone the project

```bash
  git clone https://github.com/tskrio/tskrbase.git tskr
```

### Go to the project directory

```bash
  cd tskrbase
```

### Install dependencies

```bash
  yarn i
```

### Configure a PostgresDB

1.  Provision a PostgreSQL project.
2.  Click on PostgreSQL, then Connect.
3.  Copy the Postgres Connection URL

### Configure Environment Variables

Modify the ./.env file to have a `DATABASE_URL`.  Paste what you have from #3 above.
Add the following to the end.
```
?connection_limit=1
```

It should look like so.

```
DATABASE_URL=postgres://<user>:<pass>@<url>/<db>?connection_limit=1
```

Push SQL to your database

```bash
  yarn rw prisma migrate dev
```

Start the server

```bash
  yarn rw dev
```
