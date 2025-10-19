import React, { useState } from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface AgentInputBarProps {
  onSend: (prompt: string) => void;
  isLoading: boolean;
}

const AgentInputBar: React.FC<AgentInputBarProps> = ({ onSend, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSend(prompt.trim());
      setPrompt('');
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gray-900/50 backdrop-blur-lg pb-4 pt-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask MiseMentorAgent anything... (e.g., 'What were labor costs last week?')"
            disabled={isLoading}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg py-3 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-cyan-400 hover:bg-cyan-500/10 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors"
            aria-label="Send prompt to agent"
          >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-500 border-t-cyan-400 rounded-full animate-spin"></div>
            ) : (
                <SparklesIcon className="w-6 h-6" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentInputBar;
