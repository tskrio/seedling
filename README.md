
# Tskr

Tskr is a open source, task and asset tracking application built on [RedwoodJS].
Imagine a low-cost task and asset tracking system where you define complex rules
to execute the business needs you have — that's Tskr. We are an opinionated
system. We make the decisions so you don't have to.



## Features

- Simple Role Based Access.(Not Implemented Yet)
  What does that mean?
  There's a lot of places you have to secure to ensure a safe system.
  We've abstracted that down to one file.
  If you want to change what roles have access to parts of Tskr, you
  only need to edit [./api/src/lib/roles.js]
- Rules.(Not Implemented Yet)
  What are rules?
  Rules are bits of code that can execute to make outbound calls,
  update records, or modify what was submitted. Here are the default
  ones on task.
  - [Calculate Priority]
  - [Email Assigned to]
  - [Assign High Priorities to Hugh]
  - [Log when something is deleted]
  - [Update title to append \[Solved\]]
- Responsive Email templating via MJML(Not Implemented Yet)
- Mailgun integrated as the email service provider.(Not Implemented Yet)
- Created with the [JAMStack] in mind.
  This is a great way to spin up something that has low risk, low cost,
  and a lot of potiental upsides.

[./api/src/lib/roles.js]: https://github.com/jacebenson/rw-poc/blob/main/api/src/lib/roles.js
[JAMStack]: https://www.netlify.com/jamstack/
[Calculate Priority]:https://github.com/shiningblue7/tskr/blob/main/api/src/rules/tasks/create-update-calculate-priority.js
[Email Assigned to]:https://github.com/shiningblue7/tskr/blob/main/api/src/rules/tasks/email-assigned-to.js
[Assign High Priorities to Hugh]:https://github.com/shiningblue7/tskr/blob/main/api/src/rules/tasks/assign-high-priority.js
[Log when something is deleted]:https://github.com/shiningblue7/tskr/blob/main/api/src/rules/tasks/log-when-something-is-deleted.js
[Update title to append \[Solved\]]:https://github.com/shiningblue7/tskr/blob/main/api/src/rules/tasks/update-title-when-solved.js

## Contributing

Contributions are always welcome!

We follow the [Github Flow], we're still new to this so bear with us.

We review Pull Requests on Mondays and Wednesdays.

If you would like to work on an issue comment on it.

[Github Flow]: https://guides.github.com/introduction/flow/
## Run Locally

### Clone the project

```bash
  git clone https://github.com/shiningblue7/tskr.git tskr
```

### Go to the project directory

```bash
  cd tskr
```

### Install dependencies

```bash
  yarn i
```

### Configure a PostgresDB

1.  Goto [Railway] and provision a PostgreSQL project.
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

[Railway]: https://railway.app/

## Acknowledgements

 - [RedwoodJS]

[RedwoodJS]: https://redwoodjs.com/