const PaymentController = require('../controllers/payment.controller');
const TransactionController = require('../controllers/transaction.controller');
const ContractController = require('../controllers/contract.controller');

const routes = require('express').Router();

//transaction
routes.get('/getTransaction', TransactionController.getAllTransactions);
routes.get('/getUserTickets', TransactionController.getUserTickets);
routes.get('/getAllTickets', TransactionController.getAllTickets);

//contract
routes.get('/getPool', ContractController.getLotteryPool);
routes.get('/getAddress', ContractController.getAddress);
routes.get('/getEntries', ContractController.getEntries);
routes.delete('/destroy', ContractController.destroy);

//payment
routes.post('/getTicket', PaymentController.generateLottery);

module.exports = routes;
