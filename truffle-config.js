require('dotenv').config();
require('babel-register');
require('babel-polyfill');

var PrivateKeyProvider = require("truffle-privatekey-provider");

var privateKey =
  "$PRIVATEKEY";

const HDWalletProvider = require('truffle-hdwallet-provider');

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

const infuraProvider = network => providerWithMnemonic(
  process.env.MNEMONIC || '',
  `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
);

const ropstenProvider = process.env.SOLIDITY_COVERAGE
  ? undefined
  : infuraProvider('ropsten');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // eslint-disable-line camelcase
    },
    ropsten: {
      provider: ropstenProvider,
      network_id: 3 // eslint-disable-line camelcase
    },
    rinkeby: {
      provider: new PrivateKeyProvider(
        privateKey,
        "https://rinkeby.infura.io/SS37Fx8K55l9PAEVZ7TM"
      ), // Connect to geth on the specified
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    },
    coverage: {
      host: "localhost",
      network_id: "*", // eslint-disable-line camelcase
      port: 8555,
      gas: 0xfffffffffff
    },
    testrpc: {
      host: "localhost",
      port: 8545,
      network_id: "*" // eslint-disable-line camelcase
    },
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*" // eslint-disable-line camelcase
    }
  }
};
