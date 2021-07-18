const express = require('express');
var cors = require('cors');

const productRoutes = require('./Api/Products/products');

class Router {
  constructor() {}

  getRoutes() {
    const router = express.Router();
    // router.use(cors());
    router.use('/products', productRoutes);
    return router;
  }
}

module.exports = Router;
