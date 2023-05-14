import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import Safe, { EthersAdapter, SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit'
import dotenv from 'dotenv'


async function main() {
  
  // Set up the provider and signer wallet: This account will create the Safe wallet
  dotenv.config()
  const INFURA_KEY = process.env.INFURA_KEY
  const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_KEY}`); 
  const private_key = process.env.PRIVATE_KEY

  const signerWallet = new ethers.Wallet(private_key, provider); 

  // EthAdapter is the safe wrapper for ethers.js and web3.js to make things compatible
  const ethAdapter = new EthersAdapter({ethers, signerOrProvider: signerWallet}); 
  const safeFactory = await SafeFactory.create({ ethAdapter })

  // Add the addresses that will be owners of this safe
  const owners = ['0x7BF1F248E5E8BdD476d89D9456546C3C03862E5b', '0x048266c4609489f570D567B927CA3F137C06cD8D']
  const threshold = 1
  const safeAccountConfig: SafeAccountConfig = {
  owners,
  threshold
  }

  const safeSdk: Safe = await safeFactory.deploySafe({safeAccountConfig})
  const newSafeAddress = await safeSdk.getAddress()

  console.log("New Address: " + newSafeAddress)

  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
