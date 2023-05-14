import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv'
dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY?.toString()
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
    },
    polygon_testnet: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    scroll_alpha_testnet: {
      url: `https://alpha-rpc.scroll.io/l2`,
      accounts: [PRIVATE_KEY]
    }

  }

};

export default config;
