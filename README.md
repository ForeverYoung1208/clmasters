## To start the application in Linux system, you need the packages
  - git,
  - node (tested with 12.11.1 ),
  - yarn (tested with 1.22.4),
  - psql (PostgreSQL) (tested with 11.7)

 to be installed in the system. Then follow next steps:

Fitst, clone the project 
- $ git clone git@github.com:ForeverYoung1208/clmasters.git

there you'll find two folders, for backend (server) and frontend(client):

- client/
- server/


### To start/build frontend:

1. cd into folder client/ :
- $ cd client/

2. Install node dependencies for client:
- $yarn install

3. Create .env file in the client folder:
- $touch .env

4. Populate the .env file with configuration data (API url for production and/or development), for example:
```
REACT_APP_PRODUCTION_URL=http://clmasters.fyoung.dp.ua
REACT_APP_DEVELOPMENT_URL=http://localhost:5000
```

5. Starting/building the client application.

    5.1. In development mode:
    - $yarn client

    5.2. To make a clean production build:
    - $yarn build

    *The clean build will be placed in the folder "client/build". Backend is already configured to serve this folder as production build folder.*


### To start backend:

1. cd into folder server/ :
- $ cd server/

2. Install node dependencies for server:
- $yarn install

3. Update configuration data in .env file according to you system configuration, for example:
```
APP_PORT_DEV=5000
APP_PORT_PROD=5001
APP_BUILD_FOLDER="../client/build"
DB_HOST="localhost"
DB_PORT=5432
DB_USER="clm"
DB_PASS="120880"
SECUR_SALTROUNDS=3
SECUR_JWTSECRET="jwt Secret for token security"
SECUR_JWTSECRET_REFRESH="another jwt Secret for refresh token security"
```

5. With psql, create user according to the credentials in .env file (DB_USER, DB_PASS),
create databases "clmasters_production" and/or "clmasters_development" and grant user all rights on these databases

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
    - $yarn server

    8.2. In production mode (shortcut for NODE_ENV=production node app.js), serves frontend data from the APP_BUILD_FOLDER folder:
    - $yarn prod

    You also can use the following scripts here to manipulate the client part:
    - start client:                             $yarn client
    - start both, client and server:            $yarn dev
    - make a production build of the client:    $yarn client:build

    8.3 to start whole application in background mode, I recomment to use utility "forever":
    - $ [sudo] npm install forever -g
    - $NODE_ENV=production forever start app.js


