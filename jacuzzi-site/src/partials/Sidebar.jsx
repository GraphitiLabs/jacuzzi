import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="grid grid-cols-2 items-center">
          <svg className='bg-indigo-500 rounded-md p-1' fill="#C4CEFD" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
	 width="50px" height="50px" viewBox="0 0 247.313 247.313"
	 >
<g>
	<g>
		<path d="M36.833,118.743c0.903,0.784,2.016,1.167,3.125,1.167c1.339,0,2.672-0.56,3.615-1.65
			c0.74-0.854,17.978-21.104,4.907-37.558c-7.25-9.129-1.897-14.433-0.726-15.422c2.025-1.647,2.354-4.63,0.721-6.681
			c-1.646-2.07-4.655-2.403-6.716-0.761c-5.008,3.993-11.617,15.147-0.763,28.81c8.139,10.242-4.527,25.214-4.651,25.356
			C34.625,113.999,34.835,117.019,36.833,118.743z"/>
		<path d="M78.649,99.626c0.903,0.784,2.016,1.167,3.125,1.167c1.339,0,2.672-0.56,3.614-1.65
			c0.74-0.854,17.978-21.104,4.908-37.559c-7.25-9.128-1.897-14.433-0.726-15.422c2.025-1.647,2.354-4.63,0.721-6.681
			c-1.645-2.07-4.651-2.404-6.716-0.761c-5.008,3.993-11.617,15.147-0.763,28.81c8.14,10.242-4.527,25.214-4.651,25.356
			C76.442,94.883,76.652,97.902,78.649,99.626z"/>
		<path d="M115.669,99.626c0.903,0.784,2.016,1.167,3.125,1.167c1.339,0,2.672-0.56,3.612-1.65
			c0.742-0.854,17.98-21.104,4.91-37.559c-7.25-9.128-1.893-14.433-0.728-15.422c2.028-1.647,2.357-4.63,0.723-6.681
			c-1.645-2.07-4.655-2.404-6.716-0.761c-5.008,3.993-11.616,15.147-0.763,28.81c8.137,10.242-4.527,25.214-4.651,25.356
			C113.461,94.883,113.676,97.902,115.669,99.626z"/>
		<circle cx="212.865" cy="88.353" r="26.285"/>
		<path d="M28.67,209.635h189.969c15.816,0,28.675-12.863,28.675-28.675v-27.209c0-5.47-5.396-9.778-13.895-13.189
			c-0.051,1.689-0.271,3.389-0.686,5.078c-0.354,1.451-0.742,2.852-1.144,4.224c3.322,1.367,5.367,2.688,6.049,3.846
			c-0.094,0.172-0.257,0.35-0.411,0.531c-0.159,0.188-0.284,0.369-0.509,0.565c-0.247,0.215-0.598,0.438-0.924,0.658
			c-0.294,0.2-0.556,0.396-0.92,0.606c-0.401,0.224-0.9,0.457-1.381,0.69c-0.42,0.21-0.812,0.416-1.307,0.626
			c-0.047,0.023-0.104,0.042-0.149,0.064c-1.078,0.351-2.222,0.775-3.528,1.345c-1.135,0.499-2.371,0.947-3.585,1.409
			c2.147-4.756,4.252-10.407,5.806-16.773c3.146-12.815-7.354-24.278-19.503-25.004c-2.562-0.154-5.358,0.124-8.229,0.635
			c-4.779-3.311-14.337-8.09-32.138-11.374c3.436-7.507,5.545-17.826-1.727-26.983c-7.248-9.128-1.895-14.433-0.729-15.422
			c2.031-1.647,2.362-4.63,0.729-6.681c-1.647-2.07-4.653-2.404-6.721-0.758c-5.003,3.99-11.611,15.145-0.761,28.808
			c4.942,6.221,2.208,14.178-0.728,19.508c-9.549-1.235-20.909-2.056-34.567-2.147c-0.019,0-0.042,0-0.068,0
			c-5.246,0-9.519,4.24-9.551,9.495c-0.035,5.278,4.214,9.588,9.496,9.621c26.648,0.178,43.272,3.244,53.298,6.269
			c-2.311,1.73-4.462,3.57-6.217,5.544c-2.674,3.02-5.605,6.329-8.605,9.735c-21.567,3.379-34.816-0.942-35.181-1.073
			c-4.95-1.778-10.396,0.774-12.205,5.713c-1.815,4.956,0.733,10.444,5.689,12.255c0.677,0.253,9.362,3.268,23.877,3.52
			c-1.745,2.059-3.043,3.771-4.126,5.307c-3.519-0.01-6.529-0.061-8.689-0.112c-0.453-0.056-0.915-0.107-1.373-0.168
			c-2.977,0.042-5.943,0.089-9.044,0.089c-4.44,0-8.755-0.042-12.951-0.121c-1.577-0.028-3.05-0.084-4.592-0.127
			c-2.553-0.069-5.139-0.125-7.593-0.219c-2.224-0.084-4.322-0.201-6.461-0.304c-1.65-0.079-3.356-0.149-4.957-0.237
			c-2.772-0.164-5.409-0.355-8.039-0.547c-0.85-0.061-1.752-0.111-2.59-0.177c-41.128-3.221-64.298-10.207-66.839-14.725
			c3.397-6.03,43.509-16.452,114.019-16.452c14.08,0,26.887,0.43,38.489,1.139l4.896-5.535c-9.539-2.002-23.573-3.794-43.476-3.92
			c-1.998-0.014-3.895-0.438-5.614-1.194C93.456,128.124,0,130.915,0,153.751v27.209C-0.005,196.771,12.855,209.635,28.67,209.635z"
			/>
	</g>
</g>
</svg>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">jacuzzi</span>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup
                activecondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname === '/' || pathname.includes('dashboard')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current ${
                                  pathname === '/' ||
                                  pathname.includes('dashboard')
                                    ? 'text-indigo-500'
                                    : 'text-slate-400'
                                }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname === '/' ||
                                  pathname.includes('dashboard')
                                    ? 'text-indigo-600'
                                    : 'text-slate-600'
                                }`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname === '/' ||
                                  pathname.includes('dashboard')
                                    ? 'text-indigo-200'
                                    : 'text-slate-400'
                                }`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Main
                              </span>
                            </NavLink>
                          {/* </li> */}
                          {/* <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/dashboard/analytics"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Analytics
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/dashboard/fintech"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Fintech
                              </span> */}
                            {/* </NavLink> */}
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* E-Commerce */}
              {/* Finance */}
              <SidebarLinkGroup activecondition={pathname.includes('finance')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes('finance')
                            ? 'hover:text-slate-200'
                            : 'hover:text-white'
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current ${
                                  pathname.includes('finance')
                                    ? 'text-indigo-300'
                                    : 'text-slate-400'
                                }`}
                                d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes('finance')
                                    ? 'text-indigo-500'
                                    : 'text-slate-700'
                                }`}
                                d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes('finance')
                                    ? 'text-indigo-600'
                                    : 'text-slate-600'
                                }`}
                                d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Tubs
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/finance/cards"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                My Tubs
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/finance/transactions"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' +
                                (isActive
                                  ? 'text-indigo-500'
                                  : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tub Allocator
                              </span>
                            </NavLink>
                          </li>

                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Job Board */}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
