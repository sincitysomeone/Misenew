import React from 'react';
import BookIcon from './icons/BookIcon';
import CodeIcon from './icons/CodeIcon';

type View = 'rules' | 'architecture';

interface TabNavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

const TabButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ label, isActive, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 ${
      isActive
        ? 'bg-gray-700 text-white'
        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const TabNavigation: React.FC<TabNavigationProps> = ({ currentView, setView }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-1.5 inline-flex items-center space-x-2">
      <TabButton
        label="Core Rules"
        isActive={currentView === 'rules'}
        onClick={() => setView('rules')}
        icon={<BookIcon className="w-5 h-5" />}
      />
      <TabButton
        label="System Architecture"
        isActive={currentView === 'architecture'}
        onClick={() => setView('architecture')}
        icon={<CodeIcon className="w-5 h-5" />}
      />
    </div>
  );
};

export default TabNavigation;