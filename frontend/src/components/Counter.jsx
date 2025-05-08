import React, { useState } from 'react';
import { HiPlusSm, HiMinusSm } from 'react-icons/hi';

function Counter() {
  const [number, setNumber] = useState(1);

  const increment = () => {
    const num = parseInt(number) || 0;
    if (num < 99) {
      setNumber(num + 1);
    }
  };

  const decrement = () => {
    const num = parseInt(number) || 0;
    if (num > 1) {
      setNumber(num - 1);
    }
  };

  const changeInput = (e) => {
    const value = e.target.value.replace(/\s/g, '');

    if (!isNaN(value) && Number(value) >= 0 && Number(value) <= 99) {
      setNumber(Number(value));
    }
  };

  return (
    <div className="counter">
      <button onClick={decrement}>
        <HiMinusSm />
      </button>

      <input
        onChange={changeInput}
        value={number}
      />

      <button onClick={increment}>
        <HiPlusSm />
      </button>
    </div>
  );
}

export default Counter;
