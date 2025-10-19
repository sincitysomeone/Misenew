import React from 'react';
import DocumentIcon from './icons/DocumentIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <DocumentIcon className="h-8 w-8 text-cyan-400" />
            <div>
              <h1 className="text-xl font-bold text-gray-100 tracking-tight">
                Mise Framework Rulebook
              </h1>
              <p className="text-xs text-cyan-400/80 -mt-0.5">Powered by MiseMentorAgent</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;