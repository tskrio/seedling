
# TskrBase

TskrBase is a 0 to Low cost solution to track records and make automation accessible to everyone.

## Features

Everything [RedwoodJS](https://github.com/redwoodjs/redwood#features) has.
Everything [Prisma](https://www.prisma.io/docs/) gives as well.

- [Authentication](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup)
- [Users, Groups, and Group Roles](#Roles%20Management)
- Rules that are similiar to Prisma Middleware, except we have access to raise messages to the user.
- Accessiblity conscience
- Internationalization conscience
- Custom Generators to speed up development
- *RedwoodJS* [Generators](https://redwoodjs.com/docs/cli-commands#generate-alias-g) - Generators allow you to spin up most things quickly without having to recreate them from scratch
- *RedwoodJS* [Cells](https://redwoodjs.com/docs/cells) - React components with State included
- *RedwoodJS* [Role Based Access Controls](https://redwoodjs.com/cookbook/role-based-access-control-rbac#role-matrix-for-blog-rbac)
- *RedwoodJS* [Component Driven Development via Storybook](https://redwoodjs.com/docs/storybook)
- *RedwoodJS* [Testing](https://redwoodjs.com/docs/testing#redwood-and-testing)
- *RedwoodJS* [Deploy Targets](https://redwoodjs.com/docs/deploy) - With RedwoodJS, you can deploy to your choice of hosts including self-hosted
- *Prisma* [Studio](https://www.prisma.io/docs/concepts/components/prisma-studio) - A simple viewer/editor for tables on your database
- *Prisma* [Database Connections](https://www.prisma.io/docs/concepts/database-connectors) - With Prisma you can connect to most types of databases
- *Prisma* [Middleware](https://www.prisma.io/docs/concepts/components/prisma-client/middleware) - A way to modify data before it's written
- *Prisma* [Aggregation, Grouping, and Summarizing](https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing)
- *Prisma* [Database polyfills](https://www.prisma.io/docs/concepts/components/prisma-client/database-polyfills)
- *Prisma* [Raw database access](https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access)

### Roles Management

Users are only given access to create, read, update and delete records via roles.  Roles are only given to a user from their groups.
### Upcoming Features

- [ ] Custom Generators that set up rules
- [ ] Better looking UI
- [ ] Internationalization set up with a simple key value messages file
## Contributing

Contributions are always welcome!

We follow the [Github Flow], we're still new to this so bear with us.

We review Pull Requests on Mondays and Wednesdays.

If you would like to work on an issue comment on it.

[Github Flow]: https://guides.github.com/introduction/flow/
### Running in Gitpod

1.  Fork the Repository.
2.  Goto your fork.
3.  Configure a PostgresDB

      This is a bit more involved but you'll need a database **somewhere** either on your machine or hosted somewhere.  I generally set up a https://railway.app postgressql database

     -  Provision a PostgreSQL project.
     -  Click on PostgreSQL, then Connect.
     -  Copy the Postgres Connection URL
4.  Set up your [environment variables](https://gitpod.io/variables) in gitpod.
      |Name|Scope|Value|
      |---|---|---|
      | DATABASE_URL | yourName/tskrBase | Connection String from above |
      | SESSION_SECRET | yourName/tskrBase | Well set this later |
3.  [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer)
5.  When the terminal comes do the following.
6.  Push your schema to your database via `yarn rw prisma migrate dev`.
4.  Generate a new secret via `yarn rw g secret`.
5.  Copy that string and set it in the varables for gitpod.
6.  Stop your workspace via the menu.  Then relaunch it.

### Running locally

1.  Fork the Repository.
2.  Clone your fork
    ```bash
    git clone https://github.com/tskrio/tskrbase.git tskr
    ```
3. Go to the project directory
   ```bash
   cd tskrbase
   ```
4. Install dependencies
   ```bash
   yarn i
   ```
5. Configure a PostgresDB

    This is a bit more involved but you'll need a database **somewhere** either on your machine or hosted somewhere.  I generally set up a https://railway.app postgressql database

   -  Provision a PostgreSQL project.
   -  Click on PostgreSQL, then Connect.
   -  Copy the Postgres Connection URL

6. Configure Environment Variables

   Modify the ./.env file to have a `DATABASE_URL` and `SESSION_SECRET`.  Paste in your connection string and add the following to the end.
   ```
   ?connection_limit=1
   ```

   It should look like so.
   ```
   DATABASE_URL=postgres://<user>:<pass>@<url>/<db>?connection_limit=1
   SESSION_SECRET=replaceme
   ```
7. Push SQL to your database
   ```bash
   yarn rw prisma migrate dev
   ```
8. Generate a new secret
   ```bash
   yarn rw g secret
   ```
   Update your `./.env` file's SESSION_SECRET
9. Start the server
   ```bash
   yarn rw dev
   ```
10. Seed the database
    ```bash
    #not yet written
    ```
    Alt. intstructions
    - Start your server `yarn rw dev`
    - Open the browser and go to http://localhost:8910/
    - Signup
    - Open Prisma Studio `yarn rw prisma studio`
    - Identify your user's ID
    - Create a Group (note the ID)
    - Create a GroupMember with user's ID and group's ID
    - Create a GroupRole with group's ID, and role of `admin`

    From here on out, you can create groups, and users in the browser, but the initial user and rights needed to be set up.  There's an issue with seeding on windows which is why these instructrions are ... long.
