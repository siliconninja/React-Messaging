# React-Messaging

A React Native messaging app using the Gatsby, Apollo, and React-Bootstrap libraries.

For the accompanying backend code, please see https://github.com/siliconninja/React-Messaging-Backend.

## How to use (development)

In the root directory (wherever you `git clone`d), make a file called `.env.development`. In that file, add a line saying `GATSBY_TEST_USERNAME=[someusername]`, replacing `[someusername]` with any username. This functionality is in the form of showing the page header with your username, but the username will be more useful later on.

Then run `npm run start`. This project uses NPM and not Yarn (for now) just because of how I set it up originally.

## How to format code

Run `npm run format` and commit/push your changes.

## How to run tests

The project uses the Jest testing tool.

Instructions TBD.
