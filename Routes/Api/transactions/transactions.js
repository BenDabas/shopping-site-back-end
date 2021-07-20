require('dotenv').config();

const Controller = require('../../../Models/controller');
const TransactionService = require('../../../Services/transactionService');

const { convertToUnderscore, createUpdateQuery } = require('../../../Utils');

class Transactions extends Controller {
  constructor() {
    super();
    this.transactionRouter = this.getRouter();
    this.transactionService = new TransactionService();
    this.setRoutes();
  }

  async createTransaction(req, res) {
    try {
      const { shoppingCartSum } = req.body;
      const price = shoppingCartSum;
      const isCreated = await this.transactionService.CreateTransaction(price);
      if (isCreated) {
        console.log(
          'Api/Transactions/transaction.js createTransaction success!'
        );
        res.status(200).json(isCreated);
      }
    } catch (err) {
      console.log('Api/Transactions/transaction.js createTransaction failed!');
      res.status(400).json({ code: err.code, message: err.message });
    }
  }

  async getAllTransactions(req, res) {
    try {
      const returningTransaction =
        await this.transactionService.GetAllTransactions();
      if (!returningTransaction) {
        console.error(
          `Api/Transactions/transaction.js getAllTransaction failed!`
        );
        res.setHeader('Access-Control-Allow-Origin', '*').status(404).json({
          message: `getAllTransactions failed!`,
        });
      } else {
        res
          .status(200)
          .setHeader('Access-Control-Allow-Origin', '*')
          .json(returningTransaction);
      }
    } catch (error) {
      console.error(
        `Api/Transaction/transaction.js getAllTransactions: failed!: ${error.message}`
      );
      res
        .status(400)
        .setHeader('Access-Control-Allow-Origin', '*')
        .json({ code: error.code, message: error.message });
    }
  }
  async getPastFiveDaysTransactions(req, res) {
    try {
      const returningTransaction =
        await this.transactionService.GetPastFiveDaysTransactions();
      if (!returningTransaction) {
        console.error(
          `Api/Transactions/transaction.js getPastFiveDaysTransactions failed!`
        );
        res.setHeader('Access-Control-Allow-Origin', '*').status(404).json({
          message: `getPastFiveDaysTransactions failed!`,
        });
      } else {
        res
          .status(200)
          .setHeader('Access-Control-Allow-Origin', '*')
          .json(returningTransaction);
      }
    } catch (error) {
      console.error(
        `Api/Transaction/transaction.js getPastFiveDaysTransactions: failed!: ${error.message}`
      );
      res
        .status(400)
        .setHeader('Access-Control-Allow-Origin', '*')
        .json({ code: error.code, message: error.message });
    }
  }

  setRoutes() {
    try {
      this.transactionRouter.post('/create', this.createTransaction.bind(this));

      this.transactionRouter.get(
        '/get-all',
        this.getAllTransactions.bind(this)
      );
      this.transactionRouter.get(
        '/get-five-days-transactions',
        this.getPastFiveDaysTransactions.bind(this)
      );
    } catch (error) {
      console.log('Error', error.message);
    }
  }

  getRouterInstance() {
    return this.transactionRouter;
  }
}

const transactionController = new Transactions();
const transactionRoutes = transactionController.getRouterInstance();

module.exports = transactionRoutes;
