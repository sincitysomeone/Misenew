import React, { useState, useCallback, useEffect } from 'react';
import { Rule } from './types';
import { getExplanationForRule, getArchitectureSummary } from './services/geminiService';
import Rulebook from './components/Rulebook';
import ExplanationPanel from './components/ExplanationPanel';
import { PROJECT_RULES, SYSTEM_ARCHITECTURE_DOCUMENT } from './constants';
import TabNavigation from './components/TabNavigation';
import ArchitectureViewer from './components/ArchitectureViewer';
import DocumentIcon from './components/icons/DocumentIcon';

type View = 'rules' | 'architecture';

const SettingsView: React.FC = () => {
  const [view, setView] = useState<View>('rules');

  // State for Rules View
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [isExplanationLoading, setIsExplanationLoading] = useState<boolean>(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);

  // State for Architecture View
  const [summary, setSummary] = useState<string>('');
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const handleSelectRule = useCallback(async (rule: Rule) => {
    if (selectedRule?.id === rule.id) {
        setSelectedRule(null);
        setExplanation('');
        return;
    }
    setSelectedRule(rule);
    setIsExplanationLoading(true);
    setExplanationError(null);
    setExplanation('');

    try {
      const result = await getExplanationForRule(rule.content);
      setExplanation(result);
    } catch (err) {
      setExplanationError('Failed to get explanation. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsExplanationLoading(false);
    }
  }, [selectedRule]);

  useEffect(() => {
    const fetchArchitectureSummary = async () => {
      if (view === 'architecture' && !summary && !summaryError) {
        setIsSummaryLoading(true);
        setSummaryError(null);
        try {
          const result = await getArchitectureSummary();
          setSummary(result);
        } catch (err) {
          setSummaryError('Failed to generate architecture summary. Please try again later.');
          console.error(err);
        } finally {
          setIsSummaryLoading(false);
        }
      }
    };
    fetchArchitectureSummary();
  }, [view, summary, summaryError]);

  return (
    <>
      <TabNavigation currentView={view} setView={setView} />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {view === 'rules' ? (
          <>
            <Rulebook 
              sections={PROJECT_RULES} 
              selectedRuleId={selectedRule?.id} 
              onSelectRule={handleSelectRule} 
            />
            <ExplanationPanel
              title="MiseMentorAgent Analysis"
              subtitle={selectedRule ? `${selectedRule.id} - ${selectedRule.title}` : null}
              content={explanation}
              isLoading={isExplanationLoading}
              error={explanationError}
              placeholderContent={
                <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
                  <DocumentIcon className="w-16 h-16 mb-4 text-gray-700" />
                  <h3 className="text-xl font-semibold text-gray-400">Select a Rule</h3>
                  <p>Choose a rule from the list to see an AI-powered explanation.</p>
                </div>
              }
            />
          </>
        ) : (
          <>
            <ArchitectureViewer document={SYSTEM_ARCHITECTURE_DOCUMENT} />
            <ExplanationPanel
              title="MiseMentorAgent Summary"
              subtitle="High-Level System Overview"
              content={summary}
              isLoading={isSummaryLoading}
              error={summaryError}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SettingsView;
