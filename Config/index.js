const dev = require('./development.json');
let config = {
  port: dev.PORT,
  db_database: dev.DB_DATABASE,
  db_host: dev.DB_HOST,
  db_port: dev.DB_PORT,
  db_user: dev.DB_USER,
  db_password: dev.DB_PASSWORD,
};

module.exports = config;
