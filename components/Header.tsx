import React from 'react';
import { MainView } from '../App';
import SettingsIcon from './icons/SettingsIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface HeaderProps {
  currentView: MainView;
  setView: (view: MainView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            {currentView === 'settings' ? (
              <>
                <button 
                  onClick={() => setView('dashboard')}
                  className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  aria-label="Back to dashboard"
                >
                  <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-100 tracking-tight">
                  Project Info
                </h1>
              </>
            ) : (
                <>
                <img src="https://www.gstatic.com/images/branding/product/1x/gemini_48dp.png" alt="Mise Logo" className="h-8 w-8"/>
                <div>
                    <h1 className="text-xl font-bold text-gray-100 tracking-tight">
                        Mise Dashboard
                    </h1>
                    <p className="text-xs text-cyan-400/80 -mt-0.5">Powered by MiseMentorAgent</p>
                </div>
              </>
            )}
          </div>
          {currentView === 'dashboard' && (
            <button
              onClick={() => setView('settings')}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="View project info"
            >
              <SettingsIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
