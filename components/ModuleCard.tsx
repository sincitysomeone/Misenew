import React from 'react';
import { Module } from '../types';

interface ModuleCardProps {
  module: Module;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const Icon = module.icon;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 group transition-all duration-300 hover:border-cyan-500/50 hover:bg-gray-800/80 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 group-hover:bg-cyan-500/10 group-hover:border-cyan-500 transition-colors duration-300">
            <Icon className="h-7 w-7 text-cyan-400 transition-colors duration-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{module.title}</h3>
            <p className="text-gray-400 text-sm mt-1 leading-snug">{module.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
