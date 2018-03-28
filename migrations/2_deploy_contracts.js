const config = require('../truffle-config.js');
require('babel-register');
require('babel-polyfill');

var CRWNRR_ReferralBasedCrowdsale = artifacts.require("./ROUX_ReferralBasedCrowdsale.sol");
var CRWNRR_Token = artifacts.require("./ROUX_Token.sol");
var SplitPayment = artifacts.require("./SplitPayment.sol");



module.exports = function (deployer, network, accounts) {
  deployContracts(deployer, accounts);
};

function deployContracts(deployer, accounts)
{
  // const owner = accounts[0];
  // const start = latestTime();
  // const finish = start + (84600 * 30); //30 days
  // const cap = web3.toWei("88888", "ether");
  // const initialRate = 9166;
  // const finalRate = 5500;
  // const minimumPurchase = web3.toWei("1", "ether");
  // return deployer
  // .then(() => {
  //     return deployer.deploy(
  //     SplitPayment,
  //     [accounts[1],accounts[2],accounts[3]],
  //     [150,150,5],
  //     {from: owner})
  //     .then(() => {
  //         return SplitPayment.deployed()
  //           .then(async SplitPaymentInstance => {
  //               return deployer.deploy(CRWNRR_Token)
  //                 .then(() => {
  //                     return CRWNRR_Token.deployed()
  //                       .then(async CRWNRR_TokenInstance => {
  //                         return deployer.deploy(
  //                         CRWNRR_ReferralBasedCrowdsale,
  //                         start,
  //                         finish,
  //                         initialRate,
  //                         finalRate,
  //                         cap,
  //                         accounts[3],
  //                         SplitPaymentInstance.address,
  //                         CRWNRR_TokenInstance.address,
  //                         minimumPurchase,
  //                         {from: owner});
  //                     });
  //               });
  //           });
  //       });
  // });
}

function latestTime() {
  return web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1
}
