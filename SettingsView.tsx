import React, { useState, useEffect } from 'react';
import { getArchitectureSummary } from './services/geminiService';
import Rulebook from './components/Rulebook';
import ExplanationPanel from './components/ExplanationPanel';
import { PROJECT_RULES, SYSTEM_ARCHITECTURE_DOCUMENT } from './constants';
import TabNavigation from './components/TabNavigation';
import ArchitectureViewer from './components/ArchitectureViewer';

type View = 'rules' | 'architecture';

const SettingsView: React.FC = () => {
  const [view, setView] = useState<View>('rules');

  // State for Architecture View
  const [summary, setSummary] = useState<string>('');
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

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
      <div className="mt-6">
        {view === 'rules' ? (
          <Rulebook sections={PROJECT_RULES} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ArchitectureViewer document={SYSTEM_ARCHITECTURE_DOCUMENT} />
            <ExplanationPanel
              title="MiseMentorAgent Summary"
              subtitle="High-Level System Overview"
              content={summary}
              isLoading={isSummaryLoading}
              error={summaryError}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SettingsView;