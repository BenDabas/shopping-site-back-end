const express = require('express');
var cors = require('cors');

const productRoutes = require('./Api/Products/products');

const transactionRoutes = require('./Api/transactions/transactions');

class Router {
  constructor() {}

  getRoutes() {
    const router = express.Router();
    // router.use(cors());
    router.use('/products', productRoutes);
    router.use('/transactions', transactionRoutes);
    return router;
  }
}

module.exports = Router;
