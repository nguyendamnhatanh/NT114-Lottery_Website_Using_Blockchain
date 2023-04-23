const PaymentController = require('../controllers/payment.controller');

const routes = require('express').Router();

routes.get('/getTransaction', PaymentController.getAllTransactions);
routes.get('/getPool', PaymentController.getLotteryPool);
routes.get('/getAddress', PaymentController.getAddress);
routes.get('/getExpire', PaymentController.getTimeRemain);
routes.get('/getEntries', PaymentController.getEntries);
routes.post('/getTicket', PaymentController.generateLottery);

module.exports = routes;
