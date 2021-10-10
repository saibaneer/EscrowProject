const Escrow = artifacts.require("Escrow");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Escrow", function (accounts) {

  let escrow;
  let deposit;
  //let beneficiary;
  //const deposit = web3.utils.toWei("1", "ether");
  let [depositor, arbiter, beneficiary] = accounts;

  beforeEach(async function(){
    deposit = web3.utils.toWei("1", "ether");
    //let [depositor, arbiter, beneficiary] = accounts;
    escrow = await Escrow.new(arbiter, beneficiary, {value: deposit});
  });

  it("should assert true", async function () {
    return assert.isTrue(true);
  });

  it("should show the balance of the contract", async function(){
    const addressOf = escrow.address;
    const balanceOf = await web3.eth.getBalance(addressOf)
    console.log("The contract has a deposit of: ",balanceOf);
  });

  it("should fund the contract", async function(){
    const addressOf = escrow.address;
    const balanceOf = await web3.eth.getBalance(addressOf)
    const deposit_string = deposit.toString();
    assert.equal(balanceOf.toString(), deposit_string);
  });
  it("should be approved by an ARBITER, and fund beneficary", async function(){
    const beforeBalance = await web3.eth.getBalance(beneficiary)
    await escrow.approve({from:arbiter});
    const afterBalance = await web3.eth.getBalance(beneficiary);
    const diff = afterBalance - beforeBalance;
    assert.equal(diff, deposit.toString());
  });
  it("should throw an error when a depositor calls approve", async function(){
    try {
      await escrow.approve({from:depositor});
    } catch(err) {
      assert(err.message.includes("You are not authorized!"));
      return;
    }
    assert(false);    
  });
  it("should throw an error when a beneficiary calls approve", async function(){
    try {
      await escrow.approve({from:beneficiary});
    } catch(err) {
      assert(err.message.includes("You are not authorized!"));
      return;
    }
    assert(false);    
  });
  
});
