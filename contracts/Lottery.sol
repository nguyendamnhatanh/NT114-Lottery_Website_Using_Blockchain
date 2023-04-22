// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Lottery {
    address public owner;
    address payable[] public players;

    struct Ticket {
        address player;
        uint lotteryCode;
        uint256 createDate;
        uint256 expireDate;
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

    function addTicket(address player, uint lotteryCode, uint256 expireDate) public {
        currentTicket.push(Ticket(player, lotteryCode ,block.timestamp, expireDate));
    }

    function getCurrentTickets() public view returns (Ticket[] memory) {
        return currentTicket;
    }

    function getCurrentPoolBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function getAllPlayer() public view returns (address payable[] memory) {
        return players;
    }

    function destroy() public {
        require(msg.sender == owner, "You are not the contract owner");
        selfdestruct(payable(owner));
    }
}