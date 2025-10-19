
import React from 'react';
import { Rule } from '../types';
import DocumentIcon from './icons/DocumentIcon';

interface ExplanationPanelProps {
  selectedRule: Rule | null;
  explanation: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse"></div>
  </div>
);

const Placeholder: React.FC = () => (
  <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
    <DocumentIcon className="w-16 h-16 mb-4 text-gray-700" />
    <h3 className="text-xl font-semibold text-gray-400">Select a Rule</h3>
    <p>Choose a rule from the list to see an AI-powered explanation.</p>
  </div>
);

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ selectedRule, explanation, isLoading, error }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 sticky top-24 h-[calc(100vh-7rem)]">
       <div className="p-6 border-b border-gray-700 h-24">
         {selectedRule ? (
            <>
                <h2 className="text-2xl font-bold text-white leading-tight">AI Explanation</h2>
                <p className="text-cyan-400 truncate">{selectedRule.id} - {selectedRule.title}</p>
            </>
         ) : (
             <h2 className="text-2xl font-bold text-white flex items-center h-full">AI Explanation</h2>
         )}
       </div>
      <div className="p-6 overflow-y-auto h-[calc(100%-6rem)]">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 bg-red-500/10 p-4 rounded-lg">
            <p className="font-semibold">An Error Occurred</p>
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && !selectedRule && <Placeholder />}
        {!isLoading && !error && explanation && (
          <div className="prose prose-invert prose-p:text-gray-300 prose-strong:text-white prose-headings:text-cyan-400 whitespace-pre-wrap font-sans text-base leading-relaxed">
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplanationPanel;
