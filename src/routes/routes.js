const PaymentController = require('../controllers/payment.controller');

const routes = require('express').Router();

routes.get('/getTransaction', PaymentController.getAllTransactions);
routes.post('/getTicket', PaymentController.generateLottery);

module.exports = routes