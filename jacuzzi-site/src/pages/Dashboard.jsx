import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import UsersTabs from './community/UsersTabs';
import UsersTabsCard from '../partials/community/UsersTabsCard';
import PaginationNumeric from '../components/PaginationNumeric';

import Image01 from '../images/user-64-01.jpg';
import Image02 from '../images/user-64-02.jpg';
import Image03 from '../images/user-64-03.jpg';
import Image04 from '../images/user-64-04.jpg';


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [address, setAddress] = useState('');

  const items = [
    {
      id: 0,
      name: 'Convservative Investor 👴',
      image: Image01,
      link: '#0',
      location: '🇮🇹',
      content:
        'Stables and Coins',
    },
    {
      id: 1,
      name: 'Growth Mindset 🌱',
      image: Image02,
      link: '#0',
      location: '🇫🇷',
      content:
        'L2s, Staking Tokens, DeFi Protocol Emissions ',
    },
    {
      id: 2,
      name: 'Degen HODLER 🚀',
      image: Image03,
      link: '#0',
      location: '🇩🇪',
      content:
        '$h1tc01ns to the moon!',
    },
    {
      id: 3,
      name: 'Bitcoin Maxi ₿',
      image: Image04,
      link: '#0',
      location: '🇮🇹',
      content:
        'wBTC, RenBTC, tBTC, sBTC, pBTC, hBTC, bBTC, etc.',
    },

  ];

  const handleAddressChange = newAddress => {
    setAddress(newAddress);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleAddressChange={handleAddressChange}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner address={address} />


            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {items.map(item => {
                return (
                  <UsersTabsCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    link={item.link}
                    location={item.location}
                    content={item.content}
                  />
                );
              })}

              {/* Line chart (Acme Advanced) */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
