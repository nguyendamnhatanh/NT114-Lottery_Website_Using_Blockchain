const { ethers } = require('ethers');
const dotenv = require('dotenv')
dotenv.config()

const abi = require('../../artifacts/contracts/Lottery.sol/Lottery.json').abi;

const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(process.env.APP_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, abi, signer);

const etherscanKey = process.env.ETHERSCAN_KEY;

const getAllTickets = async () => {
  const rawTickets = await contract.getCurrentTickets();
  const tickets = rawTickets.map((item) => {
    const value = {
      player: item[0],
      luckyNumber: String(BigInt(parseInt(item[1]._hex, 16))),
      createDate: String(BigInt(parseInt(item[2]._hex, 16))),
    };
    return value;
  });

  return tickets
};

module.exports = {
  contract: contract,
  etherscanKey: etherscanKey,
  contractAddress: contractAddress,
  getAllTickets: getAllTickets
};
