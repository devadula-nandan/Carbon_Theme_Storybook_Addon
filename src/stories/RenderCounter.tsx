import React, { useEffect, useState } from 'react';

/**
 * Counts how many times it has been mounted and remembers the count.
 *
 * A theme switch must not raise it: that would mean the story or the docs page
 * was rebuilt. Each place that shows a counter passes its own storage key.
 */
export const RenderCounter = ({ storageKey }: { storageKey: string }) => {
  const [count, setCount] = useState(() => parseInt(localStorage.getItem(storageKey) || '0'));

  useEffect(() => {
    const n = count + 1;
    setCount(n);
    localStorage.setItem(storageKey, String(n));
  }, []);

  return (
    <button
      onClick={() => {
        setCount(0);
        localStorage.setItem(storageKey, '0');
      }}
      style={{ cursor: 'pointer' }}
    >
      Renders: {count} - Reset
    </button>
  );
};
