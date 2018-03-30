const config = require('../truffle-config.js');
require('babel-register');
require('babel-polyfill');

var ROUX_ReferralBasedCrowdsale = artifacts.require("ROUX_ReferralBasedCrowdsale");
var ROUX_Crowdsale = artifacts.require("ROUX_Crowdsale");
var ROUX_Token = artifacts.require("ROUX_Token");
var SplitPayment = artifacts.require("SplitPayment");

//TEMPORARY TEST ACCOUNTS --> NOT FOR DEPLOYMENT ON MAIN NET!!
//const ownerAcct = "0xc743efc8b3ce4bd9a034c8aea837bffa228f54a3";
const ownerAcct = "0x63cF88292f39CF4a5871b0733f226f12728A13eD";
const account1 = "0x63cF88292f39CF4a5871b0733f226f12728A13eD";
const account2 = "0x26697ebd1363EF44D4a61dBa334E13B0cef1eF57";
const account3 = "0xe4D194f0E5Fd679e8E0388bA7CbE4dc6e2941a8E";

//PREVIOUS SUCCESSFUL DEPLOYMENTS ON RINKEBY
const tokenAddr = "0x2caf21ec23c4fdf7e6cd0398070151fe6c0eb946";
const splitPaymentAddr = "0x254f9f052a7bb373b5c2f8b924dad211c24c3aeb";

// module.exports = async (deployer, network) => {
module.exports = function (deployer, network) {
  const start = latestTime() + (84600 / 24);
  const finish = start + (84600 * 30); //30 days
  const cap = web3.toWei("88888", "ether");
  const minimumPurchase = web3.toWei("1", "ether");
  const initialRate = 9166;
  const finalRate = 5500;
  return deployer.deploy(ROUX_Token, {from: ownerAcct}).then(() => {
       return ROUX_Token.deployed().then(async ROUX_TokenInstance => {
         return deployer.deploy(
         ROUX_ReferralBasedCrowdsale,
         start,
         finish,
         initialRate,
         finalRate,
         cap,
         splitPaymentAddr,
         ROUX_TokenInstance.address,
         {from: ownerAcct})
         .then(() => {
         return ROUX_ReferralBasedCrowdsale.deployed().then(async ROUX_ReferralBasedCrowdsaleInstance => {
           await ROUX_TokenInstance.transferOwnership(ROUX_ReferralBasedCrowdsaleInstance.address, {from: ownerAcct});
         });
      });
     });
   });
  // return deployer.deploy(
  // SplitPayment,
  // [account2,account3],
  // [150,150],
  // {from: ownerAcct})
  // .then(() => {
  //     return SplitPayment.deployed()
  //       .then(async SplitPaymentInstance => {
  //           return deployer.deploy(ROUX_Token, {from: ownerAcct})
  //             .then(() => {
  //                 return ROUX_Token.deployed().then(async ROUX_TokenInstance => {
  //                     return deployer.deploy(
  //                     ROUX_ReferralBasedCrowdsale,
  //                     start,
  //                     finish,
  //                     initialRate,
  //                     finalRate,
  //                     cap,
  //                     SplitPaymentInstance.address,
  //                     ROUX_TokenInstance.address,
  //                     minimumPurchase,
  //                     {from: ownerAcct,gas: 6712390})
  //                     .then(() => {
  //                     return ROUX_ReferralBasedCrowdsale.deployed().then(async ROUX_ReferralBasedCrowdsaleInstance => {
  //                       await ROUX_TokenInstance.transferOwnership(ROUX_ReferralBasedCrowdsaleInstance.address);
  //                     });
  //                 });
  //             });
  //         });
  //     });
  // });
};

function latestTime() {
  return web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1
}
