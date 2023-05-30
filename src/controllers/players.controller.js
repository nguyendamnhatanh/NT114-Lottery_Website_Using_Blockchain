const { ethers } = require('ethers');
const dotenv = require('dotenv');
const { contractAddress } = require('../utils/contract');
const { contract, etherscanKey } = require('../utils/contract');
const winner = require('../data/player').winner;
dotenv.config();

const PlayerController = {
  IsWinner: async (req, res) => {
    let tickets = await contract.getCurrentTickets();
    let winnerNumber = req.body.winnerNumber;
    let winnerAddress = req.body.winnerAddress;
    if (tickets) {
      if (
        tickets.some(
          (item) =>
            Number(BigInt(parseInt(item.lotteryCode._hex, 16))) ===
            Number(winnerNumber)
        )
      ) {
        res.status(200).json({
          message: 'success',
          winner:
            Number(winnerNumber) === winner.number &&
            winner.address === winnerAddress,
        });
      } else {
        res.status(404).json({
          message: 'No Winner',
        });
      }
    }
  },
  GetWinner: (req, res) => {
    let winnerAddress = winner.address;
    if (winnerAddress) {
      res.status(200).json({
        message: 'success',
        winner: winnerAddress,
      });
    } else {
      res.status(404).json({
        message: 'No winner',
      });
    }
  },
  ClaimReward: async (req, res) => {
    console.log("🚀 ~ file: players.controller.js:48 ~ ClaimReward: ~ req:", req.body)
    const winner = req.body.winner;
    console.log("🚀 ~ file: players.controller.js:49 ~ ClaimReward: ~ winner:", winner)
    try {
      // if (!winner)
      //   throw new Error('Winner undefined')
      await contract.transfer(winner);
      res.status(200).json({ message: 'success' });
    } catch (error) {
      res.status(500).json({
        message: error + '',
        contract: contract
      });
    }
  },
  getLimit: async (req, res) => {
    let player = req.query.player;
    console.log("🚀 ~ file: players.controller.js:61 ~ getLimit: ~ req.query:", req.query)

    let tickets = await contract.getCurrentTickets();
    const rawTickets = tickets.filter((item) => item.player === player);
    console.log("🚀 ~ file: players.controller.js:64 ~ getLimit: ~ rawTickets:", rawTickets)

    try {
      if (rawTickets.length <= 5) {
        res.status(200).json({
          message: 'success',
          limit: 5,
          current: rawTickets.length
        });
      }
      else {
        res.status(403).json({
          message: 'You have reached limit',
        });
      }
    }
    catch (error) {
      res.status(500).json({
        message: error + '',
      });
    }
  },
};

module.exports = PlayerController;
