class DBTables {
  constructor(pool) {
    this.pool = pool;
  }

  setPool(pool) {
    this.pool = pool;
  }

  async createTables() {
    try {
      await this.createProductTable();
      await this.createTransactionTable();
    } catch (error) {}
  }

  async createProductTable() {
    try {
      await this.pool.query(`
                  CREATE TABLE IF NOT EXISTS products(
                      id SERIAL PRIMARY KEY,
                      title TEXT,
                      price REAL,
                      description TEXT ,
                      image_url TEXT,
                      unique_sold INT DEFAULT 0,
                      sold_amount INT DEFAULT 0,
                      created_at TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,
                      last_updated TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP
                       )`);
      console.log(
        'DB/createTables/createProductsTable Create products table success!'
      );
    } catch (error) {
      console.log(
        'DB/createTables/createProductsTable Create products table failed!',
        error.message
      );
    }
  }

  async createTransactionTable() {
    try {
      await this.pool.query(`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        price REAL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,
        last_updated TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP
      )`);
      console.log(
        'DB/createTables/createTransactionTable Create products table success!'
      );
    } catch (error) {
      console.log(
        'DB/createTables/createTransactionTable Create products table success!',
        error.message
      );
    }
  }
}

module.exports = DBTables;
