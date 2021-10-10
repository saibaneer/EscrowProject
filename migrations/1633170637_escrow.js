const Escrow = artifacts.require("Escrow.sol");
//const accounts = web3.eth.getAccounts();



module.exports = function(deployer,networks, accounts) {
  const arbiter = accounts[1];
  const beneficiary = accounts[2];
  deployer.deploy(Escrow, arbiter, beneficiary); 

};