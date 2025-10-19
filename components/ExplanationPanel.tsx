import React from 'react';

interface ExplanationPanelProps {
  title: string;
  subtitle: string | null;
  content: string;
  isLoading: boolean;
  error: string | null;
  placeholderContent?: React.ReactNode;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse"></div>
  </div>
);


const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ title, subtitle, content, isLoading, error, placeholderContent }) => {
  const hasContent = !isLoading && !error && content;
  const showPlaceholder = !isLoading && !error && !content && placeholderContent;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 sticky top-24 h-[calc(100vh-10.5rem)]">
       <div className="p-6 border-b border-gray-700 h-24">
        <h2 className="text-2xl font-bold text-white leading-tight">{title}</h2>
        {subtitle && <p className="text-cyan-400 truncate">{subtitle}</p>}
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
        {showPlaceholder && placeholderContent}
        {hasContent && (
          <div className="prose prose-invert prose-p:text-gray-300 prose-strong:text-white prose-headings:text-cyan-400 whitespace-pre-wrap font-sans text-base leading-relaxed">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplanationPanel;