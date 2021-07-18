const { Pool, Client } = require('pg');

const config = require('../config');
const DBTables = require('./createTables');

class Database {
  pool = new Pool();
  client = new Client();
  dbTables = new DBTables(this.pool);

  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this;
  }

  /**
   * Singleton instance
   */
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect() {
    try {
      this.pool = new Pool({
        host: config.db_host,
        database: config.db_database,
        user: config.db_user,
        password: config.db_password,
        port: config.db_port,
      });
      console.log('DB connect: Connected to DB');

      this.client = await this.pool.connect();
      // console.log(this.client);
      this.dbTables.setPool(this.pool);
      await this.dbTables.createTables();
    } catch (error) {
      console.log('DB connect: Can not connect to DB', error.message);
    }
  }
}

module.exports = Database;
