const config = require('../truffle-config.js');
require('babel-register');
require('babel-polyfill');

var ROUX_ReferralBasedCrowdsale = artifacts.require("ROUX_ReferralBasedCrowdsale");
var ROUX_Crowdsale = artifacts.require("ROUX_Crowdsale");
var ROUX_Token = artifacts.require("ROUX_Token");
var SplitPayment = artifacts.require("SplitPayment");

let doDeploy = false;
// TEMPORARY EOAs CREATED ONLY FOR TESTING
const ownerAcct = "0x63cF88292f39CF4a5871b0733f226f12728A13eD";
const account1 = "0xa8B3F268406FF62621e3C911E39a174232DdD8E2";
const account2 = "0x26697ebd1363EF44D4a61dBa334E13B0cef1eF57";
const account3 = "0xe4D194f0E5Fd679e8E0388bA7CbE4dc6e2941a8E";

// module.exports = async (deployer, network) => {
module.exports = function (deployer, network) {
  if(doDeploy)
  {
    return deploy(deployer, network);
  }
  return;
};

function deploy()
{
  const start = latestTime() + (84600 / 24);
  const finish = start + (84600 * 30); //30 days
  const cap = web3.toWei("88888", "ether");
  const minimumPurchase = web3.toWei("1", "ether");
  const initialRate = 9166;
  const finalRate = 5500;
   return deployer.deploy(
   SplitPayment,
   [account2,account3,account1],
   [150,150,700],
   {from: ownerAcct})
   .then(() => {
       return SplitPayment.deployed()
         .then(async SplitPaymentInstance => {
           return deployer.deploy(ROUX_Token, {from: ownerAcct}).then(() => {
                return ROUX_Token.deployed().then(async ROUX_TokenInstance => {
                  return deployer.deploy(
                  ROUX_ReferralBasedCrowdsale,
                  start,
                  finish,
                  initialRate,
                  finalRate,
                  cap,
                  SplitPaymentInstance.address,
                  ROUX_TokenInstance.address,
                  {from: ownerAcct})
                  .then(() => {
                  return ROUX_ReferralBasedCrowdsale.deployed().then(async ROUX_ReferralBasedCrowdsaleInstance => {
                    await ROUX_TokenInstance.transferOwnership(ROUX_ReferralBasedCrowdsaleInstance.address, {from: ownerAcct});
                  });
               });
              });
            });
         });
    });
}

function latestTime() {
  return web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1
}
