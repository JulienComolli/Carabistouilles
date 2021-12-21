# Carabistouilles

Simple web platform for online games, in the context of an University Project.

Our goal is to add games easily in the future, in the form of modules. The project wants us to focus first on the back-end side.

## How to install

Our webserver is easy to setup.

1. Install [NodeJS](https://nodejs.org/en/)
2. Install [NPM](https://www.npmjs.com/)
3. Clone this repository
4. Run `npm install`, this will automatically install node packages
5. Configure the server port in `config/serverConfig.js`, *(default is 8000)*
6. *(Optional)* Define a new SESSION_SECRET_KEY in `config/serverConfig.js` to increase security
7. Run the server with `npm start`, SQLite database will be created on the first launch in the db directory
8. *(Optional)* `npm run populatedb` to add data to the database
9. Access the website with your web-browser with the address `https://localhost:8000` *(or your specified port)*

## Tech stack

**Front-end** : HTML/CSS/JS, *(VueJS & SocketIO soon)*

**Back-end** : NodeJS, Express, Handlebars

**Database** : SQLite *with the library [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3)*

## A word about security

When building our website we tried to protect it from malicious *user input* attacks or miscellaneous security breaches.

### SQL Injection

To interact with our DB with use the library `better-sqlite3`. In our models we use the **.bind()** statement with our prepared requests. As the [documentation](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#binding-parameters) says, the binded parameters are converted. So the strings are sanitized before being used in the SQL query.

### Passwords

We do not store password in our database. We only store the hashes. To generate the hashes we use the [bcrypt](https://www.npmjs.com/package/bcrypt) port on node. By default the password use salt. You can configure the number of round in the `config\serverConfig.js` file.

To prevent *easy to crack* passwords, we have established a regular expression that validates password on registration and on change password requests. You can check the Regex in the `config\accountConfing.js`.

### Session Key

To handle users sessions we use the library [express-session](https://github.com/expressjs/session). To encrypt the data we use a session key stored in the `config\serverConfig.js`. To increase the security we can imagine a session key per user and a more secure place to store it.

### Image Format

As users can upload images, we must check the type of file they upload. To do so we use the library [mmmagic](https://github.com/mscdex/mmmagic). We only allow certain file type defined in `config\serverCOnfig.js`. If an user upload a wrong file-type they get an error message.

### To go deeper

To prevent spamming or big request we thought about installing this library : [express-rate-limit](https://www.npmjs.com/package/express-rate-limit). It is useful to prevent api spamming and abusive requests. But a more reliable approach would be a firewall or/and a load balancer like [nginx](https://nginx.org/).

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
