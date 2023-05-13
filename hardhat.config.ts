import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv'

// const PRIVATE_KEY = process.env.PRIVATE_KEY
const PRIVATE_KEY = "1437e8caa95092d4f88ae8d69711ab1326e54fa7ef5eb45cefa7e70e494e59e0"
const INFURA_KEY = process.env.INFURA_KEY


const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.18',
    settings: {
      evmVersion: 'london',
      optimizer: { enabled: true, runs: 5000 },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  }

};

export default config;
