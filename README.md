## To start the application in Linux system, you need the packages
  - git,
  - node (tested with 12.11.1 ),
  - yarn (tested with 1.22.4),
  - psql (PostgreSQL) (tested with 11.7)

 to be installed in the system.

## Then follow next steps:

1. Clone and cd into folder (clmasters):
- $ git clone git@github.com:ForeverYoung1208/clmasters.git

2. Install node dependencies for server:
- $yarn install

3. Install node dependencies for client:
- $yarn client:install

4. Update configuration data

    4.1. Backend: update files according to you system configuration
    - config/configDB.json  -*database configuration*
    - config/default.json -*default (development) starting port and secrets configuration*
    - config/production.json -*production starting port and secrets configuration*

    4.2. Frontend:  Create .env file in the client folder:
    - $touch client/.env

    Populate client/.env file with configuration data (API url for production and/or development), for example:

    REACT_APP_PRODUCTION_URL=http://clmasters.fyoung.dp.ua
    REACT_APP_DEVELOPMENT_URL=http://localhost:5000

5. With psql, create user and databases according to credentials in /config/configDB.json (feel free to change password)

    *How to create user and databases please refer to postgres documentation*

6. Create the database tables through running migrations with sequelize-cli tool:

    6.1. for development mode:
    - $npx sequelize-cli db:migrate:all

    6.2. for production mode:
    - $NODE_ENV=production npx sequelize-cli db:migrate:all

7. Seed the database with initial values through running seeders with sequelize-cli tool:

    7.1. for development mode:
    - $npx sequelize-cli db:seed:all

    7.2. for production mode:
    - $NODE_ENV=production npx sequelize-cli db:seed:all  

8. Starting the application.

    8.1. In development mode:
    - only server:              $yarn server
    - only client:              $yarn client
    - both, client and server:  $yarn dev

    8.2. In production mode:
    - $yarn start

    8.3. To make a clean production build:
    - $yarn client:build

    *The clean build will be placed in the folder "client/build". Backend is already configured to serve this folder as production build folder.*



