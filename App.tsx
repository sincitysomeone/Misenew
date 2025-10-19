
import React, { useState, useCallback } from 'react';
import { Rule } from './types';
import { getExplanationForRule } from './services/geminiService';
import Header from './components/Header';
import Rulebook from './components/Rulebook';
import ExplanationPanel from './components/ExplanationPanel';
import { PROJECT_RULES } from './constants';

const App: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectRule = useCallback(async (rule: Rule) => {
    if (selectedRule?.id === rule.id) {
        // Deselect if clicking the same rule again
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
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Rulebook 
            sections={PROJECT_RULES} 
            selectedRuleId={selectedRule?.id} 
            onSelectRule={handleSelectRule} 
          />
          <ExplanationPanel 
            selectedRule={selectedRule} 
            explanation={explanation} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      </main>
    </div>
  );
};

export default App;
