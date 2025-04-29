import React, { memo } from 'react';

const Cell = memo(function Cell({ value, isFixed, row, col, onChange, isInvalid }) {
  const handleChange = (e) => {
    const val = e.target.value;
    const parsed = /^[1-9]$/.test(val) ? parseInt(val, 10) : null;
    if (!isFixed && onChange) {
      onChange(row, col, parsed);
    }
  };

  // Precompute border classes
  const borderClasses = 
    (row % 3 === 0 ? 'border-t-2' : '') + 
    (col % 3 === 0 ? ' border-l-2' : '') +
    (row === 8 ? ' border-b-2' : '') +
    (col === 8 ? ' border-r-2' : '');

  return (
    <input
      type="text"
      value={value !== null ? value : ''}
      onChange={handleChange}
      disabled={isFixed}
      maxLength={1}
      className={`w-12 h-12 text-center border border-black text-lg font-semibold ${borderClasses} ${
        isInvalid ? 'bg-red-300' : 'bg-white'
      }`}
    />
  );
});

export default Cell;