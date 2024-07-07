import React from 'react';
import PropTypes from 'prop-types';

function Logo({ height = 'h-12', className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src="logo.png" alt="logo" className={`${height}`} />
    </div>
  );
}

export default Logo;
