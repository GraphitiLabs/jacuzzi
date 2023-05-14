import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import Safe, { EthersAdapter, SafeFactory, SafeAccountConfig, ConnectSafeConfig } from '@safe-global/protocol-kit'
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
  const owners = [process.env.PUBLIC_KEY_1, process.env.PUBLIC_KEY_2]
  const threshold = 1
  const safeAccountConfig: SafeAccountConfig = {
  owners,
  threshold
  }
  console.log("Deploying multisig safe...")
  const safeSdk: Safe = await safeFactory.deploySafe({safeAccountConfig})
  const newSafeAddress = await safeSdk.getAddress()

  // const ourSafeSdk = await safeSdk.connect({ ethAdapter, newSafeAddress })

  console.log("New Address: " + newSafeAddress)

  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
