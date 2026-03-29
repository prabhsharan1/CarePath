
import React from 'react';
import { Search, User, Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-care-teal flex items-center justify-center rounded-lg shadow-sm">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
             <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-care-teal">CarePath</h1>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search specialists, clinics..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-gray-900 leading-tight">Aisha Rahman</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Student ID: 20984431</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-soft-blue border border-blue-100 flex items-center justify-center overflow-hidden">
             <User className="w-5 h-5 text-care-teal" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
