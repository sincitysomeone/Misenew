import React from 'react';
import { ArchitectureSection, ArchitectureContent } from '../types';

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => (
  <div className="my-4 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
    <div className="px-4 py-1 bg-gray-700/50 text-xs text-gray-400 font-semibold tracking-wider capitalize">
      {language}
    </div>
    <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
      <code className="font-mono">{code}</code>
    </pre>
  </div>
);

const ArchitectureContentItem: React.FC<{ item: ArchitectureContent }> = ({ item }) => {
  switch (item.type) {
    case 'heading':
      return <h2 className="text-2xl font-bold text-white mt-6 mb-3 border-b border-gray-700 pb-2">{item.content}</h2>;
    case 'subheading':
      return <h3 className="text-lg font-semibold text-cyan-400 mt-4 mb-2">{item.content}</h3>;
    case 'code':
      return <CodeBlock language={item.language || 'text'} code={item.content} />;
    case 'paragraph':
    default:
      return <p className="text-gray-300 leading-relaxed my-2 whitespace-pre-wrap">{item.content}</p>;
  }
};

interface ArchitectureViewerProps {
  document: ArchitectureSection[];
}

const ArchitectureViewer: React.FC<ArchitectureViewerProps> = ({ document }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 h-full">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">System Architecture</h2>
        <p className="text-gray-400 mt-1">Version 2.3 Final</p>
      </div>
      <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
        {document.map(section => (
          <section key={section.id} className="mb-8">
            {section.content.map((item, index) => (
              <ArchitectureContentItem key={index} item={item} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureViewer;