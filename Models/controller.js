const express = require('express');

class Controller {
  router;
  constructor() {
    this.router = express.Router();
  }
  getRouter() {
    return this.router;
  }
}

module.exports = Controller;
