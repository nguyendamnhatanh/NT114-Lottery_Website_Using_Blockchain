// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Lottery {
    address public owner;
    address payable[] public players;

    struct Ticket {
        address player;
        uint lotteryCode;
        uint256 timestamp;
    }

    Ticket[] currentTicket;

    fallback() external payable {
        players.push(payable(msg.sender));
    }

    receive() external payable {
        players.push(payable(msg.sender));
    }

    constructor() {
        owner = msg.sender;
    }

    function addTicket(uint lotteryCode) public {
        currentTicket.push(Ticket(msg.sender, lotteryCode ,block.timestamp));
    }

    function getCurrentTickets() public view returns (Ticket[] memory) {
        return currentTicket;
    }

    function getCurrentPotBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function getAllPlayer() public view returns (address payable[] memory) {
        return players;
    }
}