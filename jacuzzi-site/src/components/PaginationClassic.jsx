import React from 'react';
// import {FusionSDK, NetworkEnum} from '@1inch/fusion-sdk'



function PaginationClassic() {
//   const fusionSwap = () => {
//     const sdk = new FusionSDK({
//       url: 'https://fusion.1inch.io',
//       network: 1,
//       blockchainProvider
//   })

//   sdk.placeOrder({
//     fromTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
//     toTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
//     amount: '50000000000000000', // 0.05 ETH
//     walletAddress: '0x6b175474e89094c44da98b954eedeac495271d0f', // USDC
// }).then(console.log)
//   }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <a
              className="btn bg-white border-slate-200 text-indigo-500 "
              href="#0"
            >
            Deploy Pool
            </a>
          </li>
          <li className="ml-3 first:ml-0">
            <a
              className="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-slate-100"
              href="#0"
              // onClick={fusionSwap}
            >
              Deploy Pool and Fusion Swap
            </a>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
      </div>
    </div>
  );
}

export default PaginationClassic;
