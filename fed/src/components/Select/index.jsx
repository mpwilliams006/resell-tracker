import React, { useEffect, useState } from 'react';

const Select = ({ handleClick }) => {
  const [filter, setFilter] = useState('Filters');
  const [openDropDown, setOpenDropDown] = useState(false);
  useEffect(() => {
    handleClick(filter);
  }, [filter]);

  const filters = ['Sold Items', 'Unsold Items'];
  return (
    <div className="w-48 mx-auto">
      <label id="listbox-label" className="block text-sm font-medium text-gray-700 text-white">
        Assigned to
      </label>
      <div className="mt-1 relative">
        <button onClick={() => setOpenDropDown(true)} type="button" className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
          <span className="flex items-center">
            <span className="ml-3 block truncate text-black">
              {filter}
            </span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>
        <ul className={`${openDropDown ? 'absolute' : 'hidden'} z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`} tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
          <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9" onClick={() => { setFilter('Filters'); setOpenDropDown(false); }} id={`listbox-option-0`} role="option">
            <div className="flex items-center">
              <span className="font-normal ml-3 block truncate">
                Reset
              </span>
            </div>
          </li>
          {filters.map((filterItem, index) => (<li key={index} className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9" onClick={() => { setFilter(filterItem); setOpenDropDown(false); }} id={`listbox-option-${index}`} role="option">
            <div className="flex items-center">
              <span className="font-normal ml-3 block truncate">
                {filterItem}
              </span>
            </div>
            <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
              <svg className={`${filterItem === filter ? '' : 'hidden'} 'h-5 w-5`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </li>
          ))}
        </ul>
      </div>
    </div >
  );
};

export { Select as default };