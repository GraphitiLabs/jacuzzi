import React, { useContext } from 'react';
import { AddressContext } from '../../components/AddressContext';

function WelcomeBanner({ className }) {
  const { address } = useContext(AddressContext);

  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Background illustration */}
      <div
        className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
        aria-hidden="true"
      >
      </div>

      {/* Content */}
      <div className="relative">
        {address ? (
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">
            Hello, {address.slice(0, 6)}...{address.slice(-4)} 👋
          </h1>
        ) : (
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">
            Connect to get started 👍
          </h1>
        )}
        <p>Jacuzzi enables self-custodial index pools managed by either you or a professional portfolio manager!</p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
