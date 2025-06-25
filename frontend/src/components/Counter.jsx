import React from 'react';
import { HiPlusSm, HiMinusSm } from 'react-icons/hi';

function Counter({ value, onChange }) {
  const increment = () => {
    const num = parseInt(value) || 0;
    if (num < 99) {
      onChange(num + 1);
    }
  };

  const decrement = () => {
    const num = parseInt(value) || 0;
    if (num > 1) {
      onChange(num - 1);
    }
  };

  const changeInput = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    if (!isNaN(value) && Number(value) >= 0 && Number(value) <= 99) {
      onChange(Number(value));
    }
  };

  return (
    <div className="counter">
      <button onClick={decrement}>
        <HiMinusSm />
      </button>
      <input
        onChange={changeInput}
        value={value}
      />
      <button onClick={increment}>
        <HiPlusSm />
      </button>
    </div>
  );
}

export default Counter;