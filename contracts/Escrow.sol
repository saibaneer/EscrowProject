// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Escrow{

  //define variables
  address public depositor;
  address public arbiter;
  address public beneficiary;
  uint256 public initialDeposit;
  
      
  constructor(address _arbiter, address _beneficiary) payable {
    depositor = msg.sender;
    arbiter = _arbiter;
    beneficiary = _beneficiary;
    initialDeposit = msg.value;
  }

  function approve() external {
    require(msg.sender == arbiter, "You are not authorized!");
    (payable(beneficiary)).transfer(address(this).balance);
  }

  
}
