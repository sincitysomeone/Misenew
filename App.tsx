import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SettingsView from './SettingsView';
import AgentInputBar from './components/AgentInputBar';
import { sendAgentPrompt } from './services/geminiService';
import Toast from './components/Toast';

export type MainView = 'dashboard' | 'settings';

const App: React.FC = () => {
  const [view, setView] = useState<MainView>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [agentResponse, setAgentResponse] = useState<{ id: number, message: string } | null>(null);

  const handleSendPrompt = async (prompt: string) => {
    setIsLoading(true);
    setAgentResponse(null);
    try {
      const response = await sendAgentPrompt(prompt);
      setAgentResponse({ id: Date.now(), message: response });
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setAgentResponse({ id: Date.now(), message: `Error: ${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header currentView={view} setView={setView} />
      
      {agentResponse && (
        <Toast
          key={agentResponse.id}
          message={agentResponse.message}
          onDismiss={() => setAgentResponse(null)}
        />
      )}

      <main className="flex-grow container mx-auto p-4 md:p-8">
        {view === 'dashboard' ? (
          <Dashboard />
        ) : (
          <SettingsView />
        )}
      </main>
      
      <AgentInputBar onSend={handleSendPrompt} isLoading={isLoading} />
    </div>
  );
};

export default App;
