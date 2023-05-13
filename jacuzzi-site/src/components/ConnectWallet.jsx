import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { AddressContext } from './AddressContext';

const ConnectWallet = ({ className, onAddressChange }) => {
  const { address, setAddress } = useContext(AddressContext);
  const [isEthereumAvailable, setIsEthereumAvailable] = useState(false);

  useEffect(() => {
    setIsEthereumAvailable(typeof window !== 'undefined' && window.ethereum);

    if (isEthereumAvailable) {
      const handleAccountsChanged = accounts => {
        if (accounts.length === 0) {
          setAddress('');
          if (onAddressChange) {
            onAddressChange('');
          }
        } else {
          setAddress(accounts[0]);
          if (onAddressChange) {
            onAddressChange(accounts[0]);
          }
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged,
        );
      };
    }
  }, [isEthereumAvailable, onAddressChange]);

  const connectWallet = async () => {
    if (!isEthereumAvailable) {
      alert(
        'MetaMask is not available. Please install the MetaMask extension and try again.',
      );
      return;
    }

    try {
      // Request access to the user's MetaMask account
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Create a new Ethers.js provider using the MetaMask provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the signer from the Ethers.js provider
      const signer = provider.getSigner();

      const newAddress = await signer.getAddress();

      // Set the connected wallet address
      setAddress(newAddress);

      if (onAddressChange) {
        onAddressChange(newAddress);
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <div>
      {address ? (
        <button className={`${className}`}>
          {address.slice(0, 6)}...{address.slice(-4)}
        </button>
      ) : (
        <button className={`${className}`} onClick={connectWallet}>
          MetaMask
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
