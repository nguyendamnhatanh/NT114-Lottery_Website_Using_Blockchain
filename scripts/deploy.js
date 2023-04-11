const main = async () => {
  const lotteryFactory = await hre.ethers.getContractFactory("Lottery");
  const lotteryContract = await lotteryFactory.deploy();

  await lotteryContract.deployed();

  console.log(lotteryContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();