import React, { useState, useEffect } from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface ToastProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, onDismiss, duration = 10000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Allow time for fade-out animation before calling onDismiss
      setTimeout(onDismiss, 300); 
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onDismiss]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-gray-800 border border-cyan-500/30 rounded-xl shadow-2xl p-4 flex items-start space-x-4">
        <div className="flex-shrink-0 text-cyan-400 mt-0.5">
          <SparklesIcon className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-white">MiseMentorAgent says:</h3>
          <p className="text-gray-300 text-sm">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="p-1 rounded-full text-gray-500 hover:text-white hover:bg-gray-700"
          aria-label="Dismiss notification"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
