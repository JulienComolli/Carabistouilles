# Carabistouilles

Simple web platform for online games, in the context of a University Project.

Our goal is to add games easily in the future, in the form of modules. The project wants us to focus first on the back-end side.

## How to install

Our webserver is easy to setup.

1. Install [NodeJS](https://nodejs.org/en/)
2. Install [NPM](https://www.npmjs.com/)
3. Clone this repository
4. Run `npm install`, this will automatically install node packages
5. Configure the server port in `config/publicConfig.js`, *(default is 8000)*
6. Run the server with `npm start`, SQLite database will be created on the first launch in the db directory
7. *(Optional)* `npm run populatedb` to add data to the database

## Tech stack

**Front-end** : HTML/CSS/JS, *(VueJS & SocketIO soon)*

**Back-end** : NodeJS, Express, Handlebars

**Database** : SQLite

## Specifications

### Code syntax

- CamelCase
- Class, functions and comments in english

### Commits syntax

```
{action} : {description}
```

- Actions : *update, bugfix, refactor*
- Description : must be short, verb in infinitive form