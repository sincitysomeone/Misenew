import React from 'react';

const BillingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m-6 2.25h6M12 9.75l.487.022a4.503 4.503 0 014.456 4.456l.022.487M12 9.75v-.487a4.503 4.503 0 014.456-4.456l.487-.022M12 9.75L11.513 9.728a4.503 4.503 0 00-4.456-4.456L6.563 5.25M12 9.75v6.487a4.503 4.503 0 01-4.456 4.456l-.487.022M12 16.237v.487a4.503 4.503 0 01-4.456 4.456l-.487.022M12 16.237L12.487 16.215a4.503 4.503 0 014.456-4.456l.022-.487M12 16.237L11.513 16.215a4.503 4.503 0 00-4.456-4.456L6.563 11.75"
    />
  </svg>
);

export default BillingIcon;
