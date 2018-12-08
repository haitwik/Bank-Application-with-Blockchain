require("events").EventEmitter.defaultMaxListeners = 0;
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require("../compile");

let myBank;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  myBank = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("myBank", () => {
  //Test - 1: Check whether contract is deployed or not
  it("Deploys a contract", () => {
    assert.ok(myBank.options.address);
  });

  //Test -2 Require minimum amount to enter
  it("Require minimum amount to enter i.e min 1 wei", async () => {
    try {
      await myBank.methods.deposit().send({
        from: accounts[0],
        value: "1"
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  //Test -3: Only depositer can withdraw
  it("Only depositer can withdraw", async () => {
    try {
      await myBank.methods.withdraw().send({
        from: accounts[0]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
