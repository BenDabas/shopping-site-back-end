const dev = require('./development.json');
const prod = require('./production.json');
require('dotenv').config();

let config;
if (process.env.NODE_ENV === 'development') {
  config = {
    port: dev.PORT,
    db_database: dev.DB_DATABASE,
    db_host: dev.DB_HOST,
    db_port: dev.DB_PORT,
    db_user: dev.DB_USER,
    db_password: dev.DB_PASSWORD,
  };
} else {
  config = {
    port: prod.PORT,
    db_database: prod.DB_DATABASE,
    db_host: prod.DB_HOST,
    db_port: prod.DB_PORT,
    db_user: prod.DB_USER,
    db_password: prod.DB_PASSWORD,
  };
}

module.exports = config;
