# CXP-Node-API

## A Node.js service to support the Victorious customer experience platform (CXP), originaly written on C# and simply converted for Node.js.

### Usage
To install the necessary packages, run:

```npm install```

Next, run the server with:

```npm start:dev```

Finally, initialize the tables and populate the seeds with:

```npm run migrate:seed```

To undo the migrations and seeders, run:

```npm run migrate:undo```

**Note**: This repository was originally created on January 30, 2022 but had to be recreated due to some sensitive data being exposed. Other changes include a .env example file, an updated software documentation file (mostly grammatical error fixes), and a longer README.
