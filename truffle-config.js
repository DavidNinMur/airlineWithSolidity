const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'bullet inspire argue remind nothing ozone whisper panda initial state pulp judge';
const infuraAPI = 'https://rinkeby.infura.io/v3/e506d02649974e6ca79be3b9899d4f76';

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*',
      gas: 5000000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraAPI),
      network_id: 4,
      gas: 4700000, // Gas limit used for deploys
      gasPrice: 4000000000
    }
  }
}