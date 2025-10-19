
import React from 'react';

const DocumentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a.375.375 0 01-.375-.375V6.75A3.75 3.75 0 0010.5 3h-4.875C5.625 3 5.625 1.5 5.625 1.5zM12 9.75a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z"
      clipRule="evenodd"
    />
    <path d="M14.25 9.75a.75.75 0 00-1.5 0v.015l.001.001.002.002.002.002.003.002.003.002.004.001.004.002.004.001.004.001.005.001h3.718a.75.75 0 000-1.5h-3.72z" />
  </svg>
);

export default DocumentIcon;
