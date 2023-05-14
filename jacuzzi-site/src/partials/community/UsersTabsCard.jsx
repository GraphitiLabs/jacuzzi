import React from 'react';
import { Link } from 'react-router-dom';
import EditMenu from '../../components/DropdownEditMenu';

function UsersTabsCard(props) {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col h-full">
        {/* Card top */}
        <div className="grow p-5">
          {/* Menu button */}
          {/* Image + name */}
          <header>

            <div className="text-center">
              <Link
                className="inline-flex text-slate-800 hover:text-slate-900"
                to={props.link}
              >
                <h2 className="text-xl leading-snug justify-center font-semibold">
                  {props.name}
                </h2>
              </Link>
            </div>

          </header>
          {/* Bio */}
          <div className="text-center mt-2">
            <div className="text-sm">{props.content}</div>
          </div>
        </div>
        {/* Card footer */}
        <div className="border-t border-slate-200">
          <Link
            className="block text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4"
            to="/"
          >
            <div className="flex items-center justify-center">

              <span>Add pool</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UsersTabsCard;
