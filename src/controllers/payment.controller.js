const { ethers } = require('ethers');
const dotenv = require('dotenv');
const { contract, getAllTickets } = require('../utils/contract');

let weeklyTickets = [];

dotenv.config();
let nextWeek = 7 * 24 * 60 * 60 * 1000;

const genWeeklyTickets = () => {
  for (let i = 0; i < 100; i++) {
    let lotteryNumber = Math.floor(100000 + Math.random() * 900000);
    while (weeklyTickets.includes(lotteryNumber)) {
      lotteryNumber = Math.floor(100000 + Math.random() * 900000);
    }
    let tickets = {
      number: lotteryNumber,
      status: true,
    };
    weeklyTickets.push(tickets);
  }
};

genWeeklyTickets();

setInterval(() => {
  weeklyTickets = [];
  genWeeklyTickets();
}, nextWeek);

const PaymentController = {
  GenerateLottery: async (req, res) => {
    try {
      let wssProvider = new ethers.providers.WebSocketProvider(
        'wss://eth-sepolia.g.alchemy.com/v2/PaYQty97bkPd0uDjTGjWX0eB8zAblAQE',
        'sepolia'
      );

      let txHash = req.body.txHash;
      let player = req.body.playerAddress;

      let transaction = await wssProvider.getTransaction(txHash);

      if (transaction) {
        let lotteryNumber = Math.floor(100000 + Math.random() * 900000);
        const tickets = await contract.getCurrentTickets();
        const rawTickets = tickets.filter((item) => item.player === player);
        if (rawTickets.length <= 5) {
          await contract.addTicket(player, lotteryNumber);
          res.status(201).json({
            message: 'Create Lottery Successfully',
            lottery: lotteryNumber,
          });
        } else {
          res.status(403).json({
            message: 'You have reached limit',
          });
        }
      } else {
        res.status(422).json({
          message: 'No transaction found',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
  BuyAvailableTicket: async (req, res) => {
    try {
      let ticket = req.body.ticket;
      const tickets = await contract.getCurrentTickets();
      res.status(200).json({
        message: 'success',
      });
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
  GetLimit: async (req, res) => {
    try {
      const player = req.query.player;
      const tickets = await contract.getCurrentTickets();
      const rawTickets = tickets.filter((item) => item.player === player);
      if (rawTickets) {
        res.status(200).json({
          message: 'success',
          limit: 5 - rawTickets.length,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
  GetTicketsGallery: (req, res) => {
    try {
      res.status(200).json({
        message: 'success',
        tickets: weeklyTickets,
      });
    } catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
  BuyDesireTickets: async (req, res) => {
    try {
      let txHash = req.body.txHash;
      let playerAddress = req.body.playerAddress;
      let ticket = req.body.ticket;

      let tickets = await getAllTickets();
      if (tickets.some((item) => item.luckyNumber === ticket && item.player === playerAddress)) {
        res.status(403).json({
          message: 'You already has this ticket',
        });
        return;
      } else {
        let wssProvider = new ethers.providers.WebSocketProvider(
          'wss://eth-sepolia.g.alchemy.com/v2/PaYQty97bkPd0uDjTGjWX0eB8zAblAQE',
          'sepolia'
        );
        let transaction = await wssProvider.getTransaction(txHash);
        if (transaction) {
          let currentTickets = tickets.filter(
            (item) => item.player == playerAddress
          );
          if (currentTickets.length >= 5) {
            res.status(403).json({
              message: 'You have reached your limit',
            });
            return;
          } else {
            await contract.addTicket(playerAddress, ticket);
            res.status(201).json({
              message: 'success',
            });
            return;
          }
        } else {
          res.status(404).json({
            message: 'No Transaction Found',
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error + '',
      });
    }
  },
};

module.exports = PaymentController;
