import { ethers } from "ethers";
export const parseAmount = (amount) => ethers.utils.parseEther(amount)._hex;
