
# TskrBase

TskrBase is a open source system to allow for users, groups, and roles
to be managed in one system. The idea here is, Start with this
repository and add the tables you need to track.

## Features

Everything [RedwoodJS](https://github.com/redwoodjs/redwood#features) has and...

- Authentication included - no other system needed
- User management
- Group management
- Role management
- Permission management
- Rules to control how things are done

### Upcoming Features

- [ ] Custom Generators that set up rules
- [ ] Better looking UI
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

### Push SQL to your database

```bash
  yarn rw prisma migrate dev
```

### Start the server

```bash
  yarn rw dev
```

### Create a User

- Open the browser and go to http://localhost:8910/
- Signup

### Give your user a role

The user's have no roles to start with.  To add a role manually, go to the prisma studio.

```bash
  yarn rw prima studio
```

It'll open a browser, look at the users, you note your ID.

Look at the userRole table, and add one where User is your ID and Role is `admin`
