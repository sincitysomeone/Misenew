import React from 'react';
import { MODULES } from '../constants';
import ModuleCard from './ModuleCard';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Welcome, Manager</h1>
      <p className="text-gray-400 mb-8">Here's an overview of your restaurant's operations. What can I help you with today?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map(module => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
