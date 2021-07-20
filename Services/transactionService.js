const Service = require('../Models/service');

const { convertObj } = require('../Utils');

class TransactionService extends Service {
  constructor() {
    super();
  }

  async CreateTransaction(price) {
    try {
      const newTransaction = await this.pool.query(
        `INSERT INTO transactions (price)
				VALUES($1)
				ON CONFLICT DO NOTHING RETURNING *`,
        [price]
      );
      if (newTransaction) {
        console.log(
          `services/TransactionService/CreateTransaction: Insert new transaction successfully! `
        );
      }
      return true;
    } catch (error) {
      console.log(
        `services/TransactionService/CreateTransaction: failed! cannot insert new transaction!`,
        error.message
      );
      return false;
    }
  }

  async GetAllTransactions() {
    try {
      let transactions;
      const res = await this.pool.query('SELECT * FROM transactions');
      if (res.rows) {
        transactions = res.rows.map(convertObj);

        console.info(
          `services/transactionService.js GetAllTransactions successfully!`
        );
        return transactions;
      }
      return false;
    } catch (error) {
      console.info(
        `services/transactionService.js GetAllTransactions failed! ${error.message}`
      );
      return false;
    }
  }
  async GetPastFiveDaysTransactions() {
    try {
      let transactions;
      const res = await this.pool.query(
        `SELECT id,price, created_at::timestamp(0) without time zone FROM transactions WHERE created_at >= current_date - interval '5' day`
      );
      if (res.rows) {
        transactions = res.rows.map(convertObj);
        console.info(
          `services/transactionService.js GetPastFiveDaysTransactionsSum successfully!`
        );
        return transactions;
      }
      return false;
    } catch (error) {
      console.info(
        `services/transactionService.js GetPastFiveDaysTransactionsSum failed! ${error.message}`
      );
      return false;
    }
  }
}

module.exports = TransactionService;
