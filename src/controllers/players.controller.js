const dotenv = require('dotenv');
const { contract } = require('../utils/contract');
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
    let winnerAddress = winner?.address;
    let winnerNumber = winner?.number;
    let isClaim = winner?.isClaim;
    if (winnerAddress && winnerNumber) {
      res.status(200).json({
        address: winnerAddress,
        number: winnerNumber,
        isClaim: isClaim,
      });
    } else {
      res.status(404).json({
        message: 'No winner',
      });
    }
  },
  ClaimReward: async (req, res) => {
    const reqWinner = req.body.winner;
    try {
      await contract.transfer(reqWinner);
      winner.isClaim = true;
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
    let tickets = await contract.getCurrentTickets();
    const rawTickets = tickets.filter((item) => item.player === player);

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