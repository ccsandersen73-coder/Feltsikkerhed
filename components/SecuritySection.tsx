import React, { useState, useEffect } from 'react';
import type { SecuritySectionData } from '../types';
import { CheckIcon } from './Icons';

const SecuritySection: React.FC<SecuritySectionData> = ({ title, Icon, colorClasses, checklist }) => {
  const storageKey = `feltsikkerhed-checklist-${title}`;

  // Fix: Initialize state from localStorage or create a new array of booleans.
  const [checkedItems, setCheckedItems] = useState<boolean[]>(() => {
    try {
      const storedItems = window.localStorage.getItem(storageKey);
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        // Basic validation to ensure stored data matches checklist length
        if (Array.isArray(parsedItems) && parsedItems.length === checklist.length) {
          return parsedItems;
        }
      }
    } catch (error) {
      console.error(`Error reading from localStorage for key "${storageKey}"`, error);
    }
    return Array(checklist.length).fill(false);
  });

  // Fix: Persist state to localStorage whenever checkedItems changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    } catch (error) {
      console.error(`Error writing to localStorage for key "${storageKey}"`, error);
    }
  }, [checkedItems, storageKey]);

  const handleCheckboxChange = (index: number) => {
    setCheckedItems(prev => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const allChecked = checkedItems.every(Boolean);

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden flex flex-col ${colorClasses.bg}`}>
      <header className={`p-4 border-b-4 ${colorClasses.border} flex items-center space-x-4`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses.iconBg}`}>
          <Icon className={`w-7 h-7 ${colorClasses.text}`} />
        </div>
        <h2 className={`text-xl font-bold ${colorClasses.text}`}>{title}</h2>
      </header>
      <div className="p-4 flex-grow">
        <ul className="space-y-3">
          {checklist.map((item, index) => (
            <li key={index} className="flex items-start">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                    className="appearance-none h-6 w-6 border-2 border-slate-400 rounded-md checked:bg-green-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                  />
                  {checkedItems[index] && (
                    <div className="absolute text-white">
                      <CheckIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <span className={`ml-3 text-slate-700 group-hover:text-slate-900 transition-all duration-300 ${checkedItems[index] ? 'line-through italic text-slate-400' : ''}`}>
                  {item}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <footer className={`mt-auto p-4 text-center font-semibold transition-colors duration-300 ${allChecked ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
        {allChecked ? 'Alt er tjekket' : 'Ikke fuldført'}
      </footer>
    </div>
  );
};

export default SecuritySection;