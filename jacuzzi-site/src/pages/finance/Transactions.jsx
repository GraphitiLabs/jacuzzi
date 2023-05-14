import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import SearchForm from '../../partials/actions/SearchForm';
import DropdownTransaction from '../../components/DropdownTransaction';
import TransactionsTable from '../../partials/finance/TransactionsTable';
import PaginationClassic from '../../components/PaginationClassic';

function Transactions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [text, setText] = useState('');
  const [initInvestment, setInitInvestment] = useState('');
  const [tokenAmounts, setTokenAmounts] = useState({});

  const [result, setResult] = useState(null);


  const handleSelectedItems = selectedItems => {
    setSelectedItems([...selectedItems]);
  };

  const prices = {'USDC': 1, 'MATIC': 0.8531, 'SUSHI': 0.8868, 'ETH': 1810 };

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleInitInvestment = (e) => {
    setInitInvestment(e.target.value);
  }


  const handleClick = (address) => {
    const query = `
      query QB5 {
        TokenBalances(
          input: {filter: {owner: {_eq: "${text}"}}, limit: 10, blockchain: ethereum}
        ) {
          TokenBalance {
            amount
            chainId
            id
            lastUpdatedBlock
            lastUpdatedTimestamp
            owner {
              addresses
            }
            tokenAddress
            tokenId
            tokenType
            token {
              name
              symbol
            }
          }
        }
      }`;

      const getTokenAmounts = (data) => {
        const tokenAmounts = {};
        data.TokenBalances.TokenBalance.forEach((entry) => {
          if (entry.token.symbol == 'USDC' || entry.token.symbol == 'MATIC'){
            tokenAmounts[entry.token.symbol] = entry.amount;
          }
        });
        return tokenAmounts;
      }

    fetch('https://api.airstack.xyz/gql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
      .then(response => response.json())
      .then(data => {setResult(data); console.log(data);   const tokenAmounts = getTokenAmounts(data.data); setTokenAmounts(tokenAmounts); console.log(tokenAmounts)});
  }


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-4 md:mb-2">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Tub Allocator
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />

                {/* Search form */}
                <div className="hidden sm:block">
                  <SearchForm />
                </div>

              </div>
            </div>

            {/* <div className="mb-5">
              <span>Transactions from </span>
              <DropdownTransaction />
            </div> */}

            {/* Filters */}
            <div className="mb-5">
              <ul className="flex flex-wrap -m-1">
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                    Polygon
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                    Gnosis
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                    Scroll
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                    Ethereum
                  </button>
                </li>
              </ul>
            </div>

            <div className='flex mb-2'>
              <input  className="form-input pl-9 focus:border-slate-300" type="text" value={text} onChange={handleChange} placeholder='Import from 0x...'/>

              <button className="btn mx-2 bg-indigo-500 border-slate-200 hover:border-slate-300 text-slate-200"
                onClick={handleClick}>
                <span className="">Import via Airstack</span>
              </button>

              <input className="form-input pl-9 focus:border-slate-300" type="text" value={initInvestment} onChange={handleInitInvestment} placeholder='Init Investment $USDC'/>

            </div>

            {/* Table */}
            <TransactionsTable selectedItems={handleSelectedItems} />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Transactions;
