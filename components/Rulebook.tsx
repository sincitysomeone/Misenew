import React, { useState, useCallback } from 'react';
import { Rule, RuleSection } from '../types';
import { getExplanationForRule } from '../services/geminiService';
import ExplanationPanel from './ExplanationPanel';
import DocumentIcon from './icons/DocumentIcon';

interface RulebookProps {
  sections: RuleSection[];
}

const Rulebook: React.FC<RulebookProps> = ({ sections }) => {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectRule = useCallback(async (rule: Rule) => {
    if (selectedRule?.id === rule.id) {
        setSelectedRule(null);
        setExplanation('');
        return;
    }
    setSelectedRule(rule);
    setIsLoading(true);
    setError(null);
    setExplanation('');

    try {
      const result = await getExplanationForRule(rule.content);
      setExplanation(result);
    } catch (err) {
      setError('Failed to get explanation. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedRule]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      onClick={() => handleSelectRule(rule)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${
                        selectedRule?.id === rule.id
                          ? 'bg-cyan-500/10 border-l-4 border-cyan-400 text-white'
                          : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                      }`}
                      aria-pressed={selectedRule?.id === rule.id}
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
      <ExplanationPanel
        title="MiseMentorAgent Analysis"
        subtitle={selectedRule ? `${selectedRule.id} - ${selectedRule.title}` : null}
        content={explanation}
        isLoading={isLoading}
        error={error}
        placeholderContent={
          <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
            <DocumentIcon className="w-16 h-16 mb-4 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-400">Select a Rule</h3>
            <p>Choose a rule from the list to see an AI-powered explanation.</p>
          </div>
        }
      />
    </div>
  );
};

export default Rulebook;