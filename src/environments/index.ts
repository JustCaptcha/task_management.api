import * as dotenv from 'dotenv';
dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// author
const AUTHOR: string = process.env.AUTHOR || 'Albert Islamov';

// application
const DOMAIN: string = process.env.DOMAIN || 'localhost';
const SERVER_PORT: number = +process.env.SERVER_PORT || 4000;
const END_POINT: string = process.env.END_POINT || 'graphql';

// static
const STATIC: string = process.env.STATIC || 'static';
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const POSTGRESS_URL: string = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
// postgres://user:secret@localhost:5432/mydatabasename
// DB_HOST = localhost;
// DB_PORT = 3306;
// DB_NAME = task_manager;
// DB_USER = task_admin;
// DB_PASSWORD = 17182342;

// typeorm
const enviroment = {
  development: {
    url: POSTGRESS_URL,
  },
  testing: {
    url: POSTGRESS_URL,
  },
  production: {
    url: POSTGRESS_URL,
  },
};
const TYPEORM = enviroment[NODE_ENV];

export { NODE_ENV, AUTHOR, DOMAIN, SERVER_PORT, END_POINT, TYPEORM };
