const { Pool } = require('pg');

const DataBase = require('../DB');

/**
 * @description Service class represent a Service with pooling methods
 * @private {Pool} pool
 * @example class ProductService extends Service
 */
class Service {
  pool = new Pool();

  constructor() {
    const database = DataBase.getInstance();
    this.pool = database.pool;
  }
}

module.exports = Service;
