Seedling is the beginning of your next project.  It builds on RedwoodJS with some conventions that will save you time at the cost of choice.  However, if you're prototyping you may not want to choose how auth, email, and automation are built in and would rather just write the code that adds value.

# Technologies

This is dependent on the following technologies.

- [RedwoodJS](https://redwoodjs.com)
  - [dbAuth](https://redwoodjs.com/docs/authentication.html#self-hosted-auth-installation-and-setup)
  - [Auth0](https://redwoodjs.com/docs/authentication.html#auth0)
- [Postgresql]()
- [MJML](https://mjml.io)
- [Chakra UI](https://chakra-ui.com)

# Features

<details><summary>Convention over configuration</summary><br/>

We want a clear way to solve most problems, if it can be solved it should be done in a repeatable way.<hr /></details>

<details><summary>Authentication providers</summary><br/>

Today we support dbAuth, and Auth0. Just change your environment variables to switch.<hr /></details>

<details><summary>Beautiful Responsive Emails</summary><br/>

No one likes the minefield that is email. MJML helps build your templates and make them beautiful on every client.<hr /></details>

<details><summary>Privacy is important to us</summary><br/>

We've taken steps to ensure that your users' privacy is respected.<hr /></details>

<details><summary>Security Roles</summary><br/>

Table and field level roles by default are set so you can simply give them out and not figure them out.<hr /></details>

<details><summary>Row Level Security</summary><br/>

Row Level Security is hard, we a convention for how to do this that makes sense.<hr /></details>

<details><summary>Automate with rules</summary><br/>

Rules are api side logic that run before and after create, read, update and delete operations.<hr /></details>

<details><summary>Accessibility</summary><br/>

We use Chakra-UI to make these sites as accessible as possible.<hr /></details>

<details><summary>Forms and Lists</summary><br/>

When generating pages and components from models, we build out sortable, searchable, filterable lists, and common forms.<hr /></details>

<details><summary>Own your data</summary><br/>

When you own it, you can do whatever you want with it. That's a tool hard to replace when you give away your keys.<hr /></details>
<br/>

# Roadmap

- [x] Authentication Targets
   - [x] dbAuth
   - [x] Auth0
   - [ ] Clerk
   - [ ] Azure Active Directory
   - [ ] Magic.Link
   - [ ] Supabase
- [x] Security
   - [x] Table level security
   - [x] Field level security
   - [x] Row level security
   - [x] Roles controlled on your database applied from the group to the user
   - [x] Field level security
      - [x] Field data on Read can be hidden (by modifying returned data)
      - [x] Field data on ReadAll can be hidden (by modifying returned data)
      - [x] Field data on Create OR Update can be rejected (by changing status from 'success')
      - [x] Field data on Create OR Update can be removed (by deleting incoming data)
   - [x] Secure by default
      - [x] We've included roles when you generate new models to control who can Create, Read, Update, and Delete
      - [x] Protective steps to mitigate XSS, and Clickjacking have been taken
- [ ] Email Providers
   - [x] Mailgun
   - [ ] Mailchimp
   - [ ] Mailjet
   - [ ] Nodemailer
   - [ ] Sendinblue
   - [ ] Sendgrid
   - [ ] Amazon SES
- [ ] Privacy
   - [x] No third-party data gets your data
   - [x] Users' emails/usernames masked by directives
   - [x] By default, users' can delete their accounts

# Getting Started, want to give it a go?

You have a few options here.

1.  You can play around on the demo site, <https://seedling.tskr.io> with logins and passwords matching for admin, manager, and employee.
2.  Goto [seedling.tskr.io] and click `Deploy to Netlify` to build your repo with proper environment variables.
3.  [Use this template](https://github.com/tskrio/seedling/generate) to get started.  This will generate a Gitpod build to get you up and running.  You will still need a postgres connection URL for your database.

## Running locally

1.  Fork the Repository.
2.  Clone your fork
    ```bash
    git clone https://github.com/tskrio/seedling.git seedling
    ```
3. Go to the project directory
   ```bash
   cd seedling
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

## Running in Gitpod

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
      | DATABASE_URL | yourName/seedling | Connection String from above |
      | SESSION_SECRET | yourName/seedling | Well set this later |
3.  [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer)
5.  When the terminal comes do the following.
6.  Push your schema to your database via `yarn rw prisma migrate dev`.
4.  Generate a new secret via `yarn rw g secret`.
5.  Copy that string and set it in the varables for gitpod.
6.  Stop your workspace via the menu.  Then relaunch it.

# Troubleshooting

Right now, sometimes when setting this up for the first time, permissions aren't always added.  I have an issue to make this better, but until then here's how to get around it.

1.  Goto prisma's studio by running this on your command line; `yarn rw prisma studio`
2.  Verify you have a user you created or admin is there.  If missing, spin up `yarn rw dev` and Sign up and try again.
3.  Still stuck? Verify there's group roles associated to the user and group in question.  If missing, create a group in prisma studio, and a group role of admin.