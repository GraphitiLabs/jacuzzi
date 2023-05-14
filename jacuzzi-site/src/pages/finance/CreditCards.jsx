import React, { useState, useEffect, useContext} from 'react';
import { Link } from "react-router-dom"

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { AddressContext } from '../../components/AddressContext';
import DoughnutChart from '../../charts/DoughnutChart';
import DoughnutChart2 from '../../charts/DoughnutChart2';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import FintechCard13 from '../../partials/fintech/FintechCard13';
import FintechCard69 from '../../partials/fintech/FintechCard69';

function CreditCards() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { address, setAddress } = useContext(AddressContext);
  const [safes, setSafes] = useState([]);
  const [showFirstBool, setShowFirstBool] = useState(true);

  const getSafes = async (address) => {
    try {
        const response = await fetch('https://safe-transaction-goerli.safe.global/api/v1/owners/' + address + '/safes/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-CSRFToken': '7J0gtRPtPoo2VhqsFwTjYS76Me4iTZtekSVA8ov2GMJMqT1CAG4CiBEcBxgCSovs'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const chartData1 = {
  labels: ['WBTC', 'WETH', 'Matic'],
  datasets: [
    {
      label: 'Percent Allocation',
      data: [30, 50, 20],
      backgroundColor: [
        tailwindConfig().theme.colors.indigo[500],
        tailwindConfig().theme.colors.sky[400],
        tailwindConfig().theme.colors.indigo[800],
      ],
      hoverBackgroundColor: [
        tailwindConfig().theme.colors.indigo[600],
        tailwindConfig().theme.colors.sky[500],
        tailwindConfig().theme.colors.indigo[900],
      ],
      hoverBorderColor: tailwindConfig().theme.colors.white,
    },
  ],
};

const chartData2 = {
  labels: ['SUSHI', 'WETH', 'USDC', 'ELON', 'USDT' ],
  datasets: [
    {
      label: 'Percent Allocation',
      data: [16, 13, 30, 22, 19],
      backgroundColor: [
        tailwindConfig().theme.colors.indigo[500],
        tailwindConfig().theme.colors.sky[400],
        tailwindConfig().theme.colors.indigo[800],
        tailwindConfig().theme.colors.yellow[400],
        tailwindConfig().theme.colors.green[500],
      ],
      hoverBackgroundColor: [
        tailwindConfig().theme.colors.indigo[600],
        tailwindConfig().theme.colors.sky[500],
        tailwindConfig().theme.colors.indigo[900],
        tailwindConfig().theme.colors.yellow[500],
        tailwindConfig().theme.colors.green[600],
      ],
      hoverBorderColor: tailwindConfig().theme.colors.white,
    },
  ],
};

  useEffect(() => {
    if(address) {
      const safes = getSafes(address);
      setSafes(safes);
    } else {
      console.log("connect wallet first!");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="lg:relative lg:flex">
            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-5">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    Index Tubs 🩳
                  </h1>
                </div>

                {/* Add card button */}
                <Link to="/finance/transactions">
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add Tub</span>
                  </button>
                </Link>
              </div>

              {/* Credit cards */}
              <div className="space-y-2">
                {/* Card 1 */}
                <label className="relative block cursor-pointer text-left w-full">
                  <input
                    type="radio"
                    name="radio-buttons"
                    className="peer sr-only"
                    defaultChecked
                    onClick={() => setShowFirstBool(true)}
                  />
                  <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                    <div className="grid grid-cols-12 items-center gap-x-2">
                      {/* Card */}
                      <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
                        <div>
                          <div className="text-sm font-medium text-slate-800">
                            Account: 0xB1D2...8F65
                          </div>
                        </div>
                      </div>
                      {/* Name */}
                      <div className="text-slate-800 font-medium col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                      <div className="text-sm">Gnosis</div>
                      </div>
                      {/* Card limits */}
                      <div className="text-slate-800 font-medium col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
                        <div className="text-sm">Solo account</div>
                      </div>
                      {/* Card status */}
                      <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                        <div className="text-xs inline-flex font-medium bg-indigo-400 text-indigo-100 rounded-full text-center px-2.5 py-1">
                          $213.46
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                    aria-hidden="true"
                  />
                </label>

                {/* Card 2 */}
                <label className="relative block cursor-pointer text-left w-full">
                <input
                    type="radio"
                    name="radio-buttons"
                    className="peer sr-only"
                    defaultChecked
                    onClick={() => setShowFirstBool(false)}
                  />
                  <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                    <div className="grid grid-cols-12 items-center gap-x-2">
                      {/* Card */}
                      <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
                        <div>
                          <div className="text-sm font-medium text-slate-800">
                            Account: 0x0001...8f3B
                          </div>
                        </div>
                      </div>
                      {/* Name */}
                      <div className="text-slate-800 font-medium col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                      <div className="text-sm">Polygon</div>
                      </div>
                      {/* Card limits */}
                      <div className="text-slate-800 font-medium col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
                        <div className="text-sm">Solo account</div>
                      </div>
                      {/* Card status */}
                      <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                        <div className="text-xs inline-flex font-medium bg-indigo-400 text-indigo-100 rounded-full text-center px-2.5 py-1">
                          $607.13
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                    aria-hidden="true"
                  />
                </label>
              </div>
            </div>

            {/* Sidebar */}
            {
              showFirstBool ? (
            <div>
              <div className="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[390px] lg:h-[calc(100vh-64px)]">
                <div className="py-8 px-4 lg:px-8">
                  <div className="max-w-sm mx-auto lg:max-w-none">
                    <div className="text-slate-800 font-semibold text-center mb-6">
                      Index Tub SAFE 0xB1D2....8F65
                    </div>

                    {/* Credit Card */}
                    <div className="relative aspect-[7/4] bg-gradient-to-tr from-slate-600 to-slate-800 p-5 rounded-xl shadow-lg overflow-hidden">
                      {/* Illustration on card */}
                      <div
                        className="absolute inset-0 w-full h-full"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-full h-full"
                          width="326"
                          height="190"
                          viewBox="0 0 326 190"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <filter
                              x="-59.5%"
                              y="-73.1%"
                              width="219%"
                              height="246.3%"
                              filterUnits="objectBoundingBox"
                              id="ccill-a"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-34.5%"
                              y="-62.5%"
                              width="169%"
                              height="225.1%"
                              filterUnits="objectBoundingBox"
                              id="ccill-b"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-23.3%"
                              y="-43.5%"
                              width="146.7%"
                              height="186.9%"
                              filterUnits="objectBoundingBox"
                              id="ccill-c"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-15.9%"
                              y="-46.1%"
                              width="131.7%"
                              height="192.1%"
                              filterUnits="objectBoundingBox"
                              id="ccill-d"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-21.8%"
                              y="-58.4%"
                              width="143.6%"
                              height="216.8%"
                              filterUnits="objectBoundingBox"
                              id="ccill-e"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-21.1%"
                              y="-77.5%"
                              width="142.1%"
                              height="254.9%"
                              filterUnits="objectBoundingBox"
                              id="ccill-f"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-19.1%"
                              y="-66%"
                              width="138.3%"
                              height="232.1%"
                              filterUnits="objectBoundingBox"
                              id="ccill-g"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-20%"
                              y="-75.6%"
                              width="140%"
                              height="251.3%"
                              filterUnits="objectBoundingBox"
                              id="ccill-h"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-32.1%"
                              y="-78.2%"
                              width="164.1%"
                              height="256.5%"
                              filterUnits="objectBoundingBox"
                              id="ccill-i"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-24.3%"
                              y="-48.7%"
                              width="148.6%"
                              height="197.4%"
                              filterUnits="objectBoundingBox"
                              id="ccill-j"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-29.7%"
                              y="-67.7%"
                              width="159.4%"
                              height="235.4%"
                              filterUnits="objectBoundingBox"
                              id="ccill-k"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-22.9%"
                              y="-39.7%"
                              width="145.9%"
                              height="179.3%"
                              filterUnits="objectBoundingBox"
                              id="ccill-l"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-27.4%"
                              y="-72%"
                              width="154.8%"
                              height="243.9%"
                              filterUnits="objectBoundingBox"
                              id="ccill-m"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-20.4%"
                              y="-66.7%"
                              width="140.9%"
                              height="233.3%"
                              filterUnits="objectBoundingBox"
                              id="ccill-n"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-70.1%"
                              y="-93.6%"
                              width="240.1%"
                              height="287.2%"
                              filterUnits="objectBoundingBox"
                              id="ccill-o"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-52.4%"
                              y="-122.3%"
                              width="204.7%"
                              height="344.6%"
                              filterUnits="objectBoundingBox"
                              id="ccill-p"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-38.5%"
                              y="-87.5%"
                              width="177%"
                              height="275%"
                              filterUnits="objectBoundingBox"
                              id="ccill-q"
                            >
                              <feGaussianBlur
                                stdDeviation="7"
                                in="SourceGraphic"
                              />
                            </filter>
                            <filter
                              x="-46.2%"
                              y="-46.4%"
                              width="192.4%"
                              height="192.8%"
                              filterUnits="objectBoundingBox"
                              id="ccill-r"
                            >
                              <feGaussianBlur
                                stdDeviation="48"
                                in="SourceGraphic"
                              />
                            </filter>
                          </defs>
                          <g fill="none" fillRule="evenodd">
                            <g stroke="#FFF">
                              <path
                                d="m74.649 51.429 35.813-29.245"
                                filter="url(#ccill-a)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="m95.001 48.454 61.614-34.273"
                                style={{
                                  mixBlendMode: 'overlay',
                                }}
                                filter="url(#ccill-b)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="m102.738 59.711 90.966-49.333"
                                filter="url(#ccill-c)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="M132.402 56.164c51.89-27.442 9.677-6.22 133.867-46.582"
                                style={{
                                  mixBlendMode: 'overlay',
                                }}
                                filter="url(#ccill-d)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="M192.973 49.441c63.823-28.1 31.403-15.88 97.219-36.765"
                                filter="url(#ccill-e)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="M174.906 63.986 275.21 36.252"
                                filter="url(#ccill-f)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="M78.484 90.425 188.905 57.9"
                                style={{
                                  mixBlendMode: 'overlay',
                                }}
                                filter="url(#ccill-g)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="M107.59 120.722 213.167 92.32"
                                filter="url(#ccill-h)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="m44.001 139.184 66.091-27.432"
                                filter="url(#ccill-i)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="m25.233 108.035 87.289-44.052"
                                filter="url(#ccill-j)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="m0 78.862 71.407-31.693"
                                filter="url(#ccill-k)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="M41.3 54.036 133.926 0"
                                filter="url(#ccill-l)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="M177.385 128.372c38.41-17.811 13.059-6.784 77.387-29.83"
                                style={{
                                  mixBlendMode: 'overlay',
                                }}
                                filter="url(#ccill-m)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="m190.745 154.661 103.507-32.222"
                                filter="url(#ccill-n)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="m235.764 74.579 30.397-22.87"
                                filter="url(#ccill-o)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="M29.686 21.19 70.172 3.645"
                                style={{
                                  mixBlendMode: 'overlay',
                                }}
                                filter="url(#ccill-p)"
                                transform="translate(23.168 10.2)"
                              />
                              <path
                                d="M17.977 79.61 73.04 55.091"
                                filter="url(#ccill-q)"
                                transform="translate(23.168 10.2)"
                              />
                            </g>
                            <path
                              fillOpacity=".24"
                              fill="#FFF"
                              style={{
                                mixBlendMode: 'overlay',
                              }}
                              filter="url(#ccill-r)"
                              d="M156 .573 331.59 311H75L20 .573z"
                              transform="translate(0 -40)"
                            />
                          </g>
                        </svg>
                      </div>
                      <div className="relative h-full flex flex-col justify-between">
                        {/* Logo on card */}

                        {/* Card number */}
                        <div className="flex justify-between text-lg font-bold text-slate-200 tracking-widest drop-shadow-sm">
                          <span>0xB1D2</span>
                          <span>××××</span>
                          <span>××××</span>
                          <span>8F65</span>
                        </div>
                        {/* Card footer */}
                        <div className="relative flex justify-between items-center z-10 mb-0.5">
                          {/* Card expiration */}
                          <div className="text-sm font-bold text-slate-200 tracking-widest drop-shadow-sm space-x-3">
                            <span>Rebalance next month</span>
                            <span>$213.46</span>
                          </div>
                        </div>
                        {/* Mastercard logo */}

                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-6">
                      <div className="text-sm font-semibold text-slate-800 mb-1">
                        Details
                      </div>
                      <ul>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200">
                          <div className="text-sm">Chain</div>
                          <div className="text-sm font-medium text-slate-800 ml-2">
                            Gnosis
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200">
                          <div className="text-sm">Status</div>
                          <div className="flex items-center whitespace-nowrap">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                            <div className="text-sm font-medium text-slate-800">
                              Active
                            </div>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200">
                          <div className="text-sm">Owner Type</div>
                          <div className="text-sm font-medium text-slate-800 ml-2">
                            Personal
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200">
                          <div className="text-sm">Total Assets</div>
                          <div className="text-sm font-medium text-slate-800 ml-2">
                            $213.46
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200">
                          <div className="text-sm">% Change</div>
                          <div className="text-sm font-medium text-green-500 ml-2">
                            14.7% ⬆️
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className='mt-6'>
                        <FintechCard13 />
                    </div>

                    <div className='mt-6'>
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
                        <header className="px-5 py-4 border-b border-slate-100">
                          <h2 className="font-semibold text-slate-800">Tub Allocation</h2>
                        </header>
                        {/* Chart built with Chart.js 3 */}
                        {/* Change the height attribute to adjust the chart height */}
                        <DoughnutChart data={chartData1} width={389} height={260} />
                      </div>
                    </div>

                    {/* Payment Limits */}
                    <div className="mt-6">
                      <div className="text-sm font-semibold text-slate-800 mb-4">
                        Allocation Slippage
                      </div>
                      <div className="pb-4 border-b border-slate-200">
                        <div className="flex justify-between text-sm mb-2">
                          <div>Percent Deviation from Allocation</div>
                          <div className="italic">
                             <span className="text-slate-400">7%</span>{' '}
                          </div>
                        </div>
                        <div className="relative w-full h-2 bg-slate-300">
                          <div
                            className="absolute inset-0 bg-yellow-500"
                            aria-hidden="true"
                            style={{ width: '7%' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Edit / Delete */}
                    <div className="flex items-center space-x-3 mt-6">
                      <div className="w-1/2">
                        <button className="btn w-full bg-indigo-500 border-slate-200 hover:border-slate-300 text-slate-200">
                          <svg
                            className="w-4 h-4 fill-current text-slate-200 shrink-0"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                          </svg>
                          <span className="ml-2">Rebal Now</span>
                        </button>
                      </div>
                      <div className="w-1/2">
                        <button className="btn w-full border-slate-200 hover:border-slate-300 bg-yellow-500 text-slate-100">

                          <span className="ml-2">Pause Auto Rebal</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              ) : (
                <div>
                <div className="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[390px] lg:h-[calc(100vh-64px)]">
                  <div className="py-8 px-4 lg:px-8">
                    <div className="max-w-sm mx-auto lg:max-w-none">
                      <div className="text-slate-800 font-semibold text-center mb-6">
                        Index Tub SAFE 0x0001....8f3B
                      </div>

                      {/* Credit Card */}
                      <div className="relative aspect-[7/4] bg-gradient-to-tr from-slate-600 to-slate-800 p-5 rounded-xl shadow-lg overflow-hidden">
                        {/* Illustration on card */}
                        <div
                          className="absolute inset-0 w-full h-full"
                          aria-hidden="true"
                        >
                          <svg
                            className="w-full h-full"
                            width="326"
                            height="190"
                            viewBox="0 0 326 190"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              <filter
                                x="-59.5%"
                                y="-73.1%"
                                width="219%"
                                height="246.3%"
                                filterUnits="objectBoundingBox"
                                id="ccill-a"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-34.5%"
                                y="-62.5%"
                                width="169%"
                                height="225.1%"
                                filterUnits="objectBoundingBox"
                                id="ccill-b"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-23.3%"
                                y="-43.5%"
                                width="146.7%"
                                height="186.9%"
                                filterUnits="objectBoundingBox"
                                id="ccill-c"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-15.9%"
                                y="-46.1%"
                                width="131.7%"
                                height="192.1%"
                                filterUnits="objectBoundingBox"
                                id="ccill-d"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-21.8%"
                                y="-58.4%"
                                width="143.6%"
                                height="216.8%"
                                filterUnits="objectBoundingBox"
                                id="ccill-e"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-21.1%"
                                y="-77.5%"
                                width="142.1%"
                                height="254.9%"
                                filterUnits="objectBoundingBox"
                                id="ccill-f"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-19.1%"
                                y="-66%"
                                width="138.3%"
                                height="232.1%"
                                filterUnits="objectBoundingBox"
                                id="ccill-g"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-20%"
                                y="-75.6%"
                                width="140%"
                                height="251.3%"
                                filterUnits="objectBoundingBox"
                                id="ccill-h"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-32.1%"
                                y="-78.2%"
                                width="164.1%"
                                height="256.5%"
                                filterUnits="objectBoundingBox"
                                id="ccill-i"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-24.3%"
                                y="-48.7%"
                                width="148.6%"
                                height="197.4%"
                                filterUnits="objectBoundingBox"
                                id="ccill-j"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-29.7%"
                                y="-67.7%"
                                width="159.4%"
                                height="235.4%"
                                filterUnits="objectBoundingBox"
                                id="ccill-k"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-22.9%"
                                y="-39.7%"
                                width="145.9%"
                                height="179.3%"
                                filterUnits="objectBoundingBox"
                                id="ccill-l"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-27.4%"
                                y="-72%"
                                width="154.8%"
                                height="243.9%"
                                filterUnits="objectBoundingBox"
                                id="ccill-m"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-20.4%"
                                y="-66.7%"
                                width="140.9%"
                                height="233.3%"
                                filterUnits="objectBoundingBox"
                                id="ccill-n"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-70.1%"
                                y="-93.6%"
                                width="240.1%"
                                height="287.2%"
                                filterUnits="objectBoundingBox"
                                id="ccill-o"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-52.4%"
                                y="-122.3%"
                                width="204.7%"
                                height="344.6%"
                                filterUnits="objectBoundingBox"
                                id="ccill-p"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-38.5%"
                                y="-87.5%"
                                width="177%"
                                height="275%"
                                filterUnits="objectBoundingBox"
                                id="ccill-q"
                              >
                                <feGaussianBlur
                                  stdDeviation="7"
                                  in="SourceGraphic"
                                />
                              </filter>
                              <filter
                                x="-46.2%"
                                y="-46.4%"
                                width="192.4%"
                                height="192.8%"
                                filterUnits="objectBoundingBox"
                                id="ccill-r"
                              >
                                <feGaussianBlur
                                  stdDeviation="48"
                                  in="SourceGraphic"
                                />
                              </filter>
                            </defs>
                            <g fill="none" fillRule="evenodd">
                              <g stroke="#FFF">
                                <path
                                  d="m74.649 51.429 35.813-29.245"
                                  filter="url(#ccill-a)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="m95.001 48.454 61.614-34.273"
                                  style={{
                                    mixBlendMode: 'overlay',
                                  }}
                                  filter="url(#ccill-b)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="m102.738 59.711 90.966-49.333"
                                  filter="url(#ccill-c)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="M132.402 56.164c51.89-27.442 9.677-6.22 133.867-46.582"
                                  style={{
                                    mixBlendMode: 'overlay',
                                  }}
                                  filter="url(#ccill-d)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="M192.973 49.441c63.823-28.1 31.403-15.88 97.219-36.765"
                                  filter="url(#ccill-e)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="M174.906 63.986 275.21 36.252"
                                  filter="url(#ccill-f)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="M78.484 90.425 188.905 57.9"
                                  style={{
                                    mixBlendMode: 'overlay',
                                  }}
                                  filter="url(#ccill-g)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="M107.59 120.722 213.167 92.32"
                                  filter="url(#ccill-h)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="m44.001 139.184 66.091-27.432"
                                  filter="url(#ccill-i)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="m25.233 108.035 87.289-44.052"
                                  filter="url(#ccill-j)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="m0 78.862 71.407-31.693"
                                  filter="url(#ccill-k)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="M41.3 54.036 133.926 0"
                                  filter="url(#ccill-l)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="M177.385 128.372c38.41-17.811 13.059-6.784 77.387-29.83"
                                  style={{
                                    mixBlendMode: 'overlay',
                                  }}
                                  filter="url(#ccill-m)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="m190.745 154.661 103.507-32.222"
                                  filter="url(#ccill-n)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="m235.764 74.579 30.397-22.87"
                                  filter="url(#ccill-o)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="M29.686 21.19 70.172 3.645"
                                  style={{
                                    mixBlendMode: 'overlay',
                                  }}
                                  filter="url(#ccill-p)"
                                  transform="translate(23.168 10.2)"
                                />
                                <path
                                  d="M17.977 79.61 73.04 55.091"
                                  filter="url(#ccill-q)"
                                  transform="translate(23.168 10.2)"
                                />
                              </g>
                              <path
                                fillOpacity=".24"
                                fill="#FFF"
                                style={{
                                  mixBlendMode: 'overlay',
                                }}
                                filter="url(#ccill-r)"
                                d="M156 .573 331.59 311H75L20 .573z"
                                transform="translate(0 -40)"
                              />
                            </g>
                          </svg>
                        </div>
                        <div className="relative h-full flex flex-col justify-between">
                          {/* Logo on card */}

                          {/* Card number */}
                          <div className="flex justify-between text-lg font-bold text-slate-200 tracking-widest drop-shadow-sm">
                            <span>0x0001</span>
                            <span>××××</span>
                            <span>××××</span>
                            <span>8f3B</span>
                          </div>
                          {/* Card footer */}
                          <div className="relative flex justify-between items-center z-10 mb-0.5">
                            {/* Card expiration */}
                            <div className="text-sm font-bold text-slate-200 tracking-widest drop-shadow-sm space-x-3">
                              <span>Rebalance in 2 months</span>
                              <span>$607.13</span>
                            </div>
                          </div>
                          {/* Mastercard logo */}

                        </div>
                      </div>

                      {/* Details */}
                      <div className="mt-6">
                        <div className="text-sm font-semibold text-slate-800 mb-1">
                          Details
                        </div>
                        <ul>
                          <li className="flex items-center justify-between py-3 border-b border-slate-200">
                            <div className="text-sm">Chain</div>
                            <div className="text-sm font-medium text-slate-800 ml-2">
                              Polygon
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 border-b border-slate-200">
                            <div className="text-sm">Status</div>
                            <div className="flex items-center whitespace-nowrap">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                              <div className="text-sm font-medium text-slate-800">
                                Active
                              </div>
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 border-b border-slate-200">
                            <div className="text-sm">Owner Type</div>
                            <div className="text-sm font-medium text-slate-800 ml-2">
                              Personal
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 border-b border-slate-200">
                            <div className="text-sm">Total Assets</div>
                            <div className="text-sm font-medium text-slate-800 ml-2">
                              $607.13
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 border-b border-slate-200">
                            <div className="text-sm">% Change</div>
                            <div className="text-sm font-medium text-red-500 ml-2">
                              -23% ⬇
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className='mt-6'>
                          <FintechCard69 />
                      </div>

                      <div className='mt-6'>
                      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
                          <header className="px-5 py-4 border-b border-slate-100">
                            <h2 className="font-semibold text-slate-800">Tub Allocation</h2>
                          </header>
                          {/* Chart built with Chart.js 3 */}
                          {/* Change the height attribute to adjust the chart height */}
                          <DoughnutChart2 data={chartData2} width={389} height={260} />
                        </div>
                      </div>

                      {/* Payment Limits */}
                      <div className="mt-6">
                        <div className="text-sm font-semibold text-slate-800 mb-4">
                          Allocation Slippage
                        </div>
                        <div className="pb-4 border-b border-slate-200">
                          <div className="flex justify-between text-sm mb-2">
                            <div>Percent Deviation from Allocation</div>
                            <div className="italic">
                               <span className="text-slate-400">3%</span>{' '}
                            </div>
                          </div>
                          <div className="relative w-full h-2 bg-slate-300">
                            <div
                              className="absolute inset-0 bg-yellow-500"
                              aria-hidden="true"
                              style={{ width: '3%' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Edit / Delete */}
                      <div className="flex items-center space-x-3 mt-6">
                        <div className="w-1/2">
                          <button className="btn w-full bg-indigo-500 border-slate-200 hover:border-slate-300 text-slate-200">
                            <svg
                              className="w-4 h-4 fill-current text-slate-200 shrink-0"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                            </svg>
                            <span className="ml-2">Rebal Now</span>
                          </button>
                        </div>
                        <div className="w-1/2">
                          <button className="btn w-full border-slate-200 hover:border-slate-300 bg-yellow-500 text-slate-100">

                            <span className="ml-2">Pause Auto Rebal</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreditCards;
