
import React from 'react';
import { Rule, RuleSection } from '../types';

interface RulebookProps {
  sections: RuleSection[];
  selectedRuleId: string | null;
  onSelectRule: (rule: Rule) => void;
}

const Rulebook: React.FC<RulebookProps> = ({ sections, selectedRuleId, onSelectRule }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 h-full">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">Core Operational Rules</h2>
        <p className="text-gray-400 mt-1">Version 2.3 Final</p>
      </div>
      <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id}>
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.rules.map((rule) => (
                <li key={rule.id}>
                  <button
                    onClick={() => onSelectRule(rule)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${
                      selectedRuleId === rule.id
                        ? 'bg-cyan-500/10 border-l-4 border-cyan-400 text-white'
                        : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="font-medium">{rule.id}</span> - {rule.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rulebook;
