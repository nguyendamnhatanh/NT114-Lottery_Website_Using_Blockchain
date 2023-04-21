const PaymentController = require('../controllers/payment.controller');

const routes = require('express').Router();

routes.get('/getTransaction', PaymentController.getAllTransactions);
routes.get('/getPool', PaymentController.getLotteryPool);
routes.post('/getTicket', PaymentController.generateLottery);

module.exports = routes