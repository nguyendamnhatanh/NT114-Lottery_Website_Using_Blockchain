const PaymentController = require('../controllers/payment.controller');

const routes = require('express').Router();

routes.get('/getTransaction', PaymentController.getAllTransactions);
routes.get('/getPool', PaymentController.getLotteryPool);
routes.get('/getAddress', PaymentController.getAddress);
routes.get('/getEntries', PaymentController.getEntries);
routes.delete('/destroy', PaymentController.destroy);
routes.post('/getTicket', PaymentController.generateLottery);

module.exports = routes;
