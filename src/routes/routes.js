const PaymentController = require('../controllers/payment.controller');
const TransactionController = require('../controllers/transaction.controller');
const ContractController = require('../controllers/contract.controller');
const PlayerController = require('../controllers/players.controller');

const routes = require('express').Router();

//transaction
routes.get('/getTransaction', TransactionController.getAllTransactions);
routes.get('/getUserTickets', TransactionController.getUserTickets);
routes.get('/getAllTickets', TransactionController.GetAllTickets);

//contract
routes.get('/getPool', ContractController.getLotteryPool);
routes.get('/getAddress', ContractController.getAddress);
routes.get('/getEntries', ContractController.getEntries);

//player
routes.post('/isWinner', PlayerController.IsWinner);
routes.post('/claim', PlayerController.ClaimReward);
routes.get('/getWinner', PlayerController.GetWinner);
routes.get('/getLimit', PlayerController.getLimit);

//payment
routes.post('/getTicket', PaymentController.GenerateLottery);
routes.get('/getLimit', PaymentController.GetLimit);
routes.get('/ticketsGallery', PaymentController.GetTicketsGallery);
routes.post('/buyDesireTicket', PaymentController.BuyDesireTickets);

module.exports = routes;
