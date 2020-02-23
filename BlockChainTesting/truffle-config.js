// Initialize HDWalletProvider
const HDWalletProvider = require("truffle-hdwallet-provider");

// Set your own mnemonic here
const mnemonic = "<12 WORD PASS PHRASE HERE>";

// Module exports to make this configuration available to Truffle itself

module.exports = {
  networks: {
    // Configuration for mainnet
    mainnet: {
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/<INFURA PROJECT ID>");
      },
      network_id: "1"
    },
    // Configuration for rinkeby network
    rinkeby: {
      // Special function to setup the provider
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/<INFURA PROJECT ID>");
      },
      // Network id is 4 for Rinkeby
      network_id: "4"
    }
  }
};