# Company review system.
Reviews play a vital role in the world today when someone decides what services or product one want to consume.

# Getting started

## Installation

Clone the repository

    git clone https://github.com/willypelz/cr-system-be.git

Switch to the repo folder

    cd cr-system-be
    
Install dependencies
    
    npm install

Copy config file and set JsonWebToken secret key

    cp src/config.ts.example src/config.ts
    
----------

## Database

The system uses a database abstractions, namely [TypeORM](http://typeorm.io/). 
    
----------

##### TypeORM

----------

Create a new mysql database with the name `company_review`\
(or the name you specified in the ormconfig.json)

Copy TypeORM config example file for database settings

    cp ormconfig.json.example
    
Set mysql database settings in ormconfig.json

    {
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "your-mysql-username",
      "password": "your-mysql-password",
      "database": "company_review",
      "entities": ["src/**/**.entity{.ts,.js}"],
      "synchronize": true
    }
    
Start local mysql server and create new database 'company_review'

On application start, tables for all entities will be created.

## NPM scripts

- `npm start` - Start application
- `npm run start:watch` - Start application in watch mode
- `npm run test` - run Jest test runner 
- `npm run start:prod` - Build application

----------


## Start application

- `npm start`
- Test api with `http://localhost:3000/api/companies` in your favourite browser

----------

# Authentication
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

----------
 
## API Documentation/access (Swagger API docs)

This application documentation can be access through ``/docs``

`` http://localhost:3000/docs ``

----------
