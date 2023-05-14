import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DropdownHelp({ align }) {

  return (
    <div className="relative inline-flex">
    <button
        className='flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full pr-4'
        onClick={() => {window.open('https://www.github.com/GraphitiLabs/jacuzzi', '_blank')}}
    >
        <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0  96 960 960" width="48"><path className="fill-current text-slate-500" d="M320 814 80 574l242-242 43 43-199 199 197 197-43 43Zm318 2-43-43 199-199-197-197 43-43 240 240-242 242Z"/></svg>
        <span>Github</span>
    </button>
</div>

  );
}

export default DropdownHelp;
