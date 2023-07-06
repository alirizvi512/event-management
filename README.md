# Take Home Assignment - Backend Engineer
  
## Description

I have completed all the key features which were required from me to be done.

I have created the register and login for the user and have also added the bonus point for verification of a user through email. So for this I have used mailtrap to send emails. 

I have completed the CRUD operation for Events and all those conditions are applied which were mentioned in the requirement.

I have written test cases for Events CRUD Apis only.

I have used NestJS (Typescript), MySQL as a Database, Prisma as ORM, Yup for request Validations, NESTJS JWT Service for Authentication, JEST for unit testing, nodemailer for sending emails.

## Installation

```bash
$ yarn install
```

## Running the app

Setup the .env file, .env.example is placed in the project root directory.

### Running Migrations & Seed

First of all run migration and seed before starting the project.

```bash
$ yarn run prisma:migrate
$ yarn run seed
```

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

