import React, { useState } from 'react';

interface FeedbackButtonsProps {
  onFeedback: (isGood: boolean) => void;
}

export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ onFeedback }) => {
  const [selected, setSelected] = useState<'good' | 'bad' | null>(null);

  const handleFeedback = (isGood: boolean) => {
    if (selected === null) {
      setSelected(isGood ? 'good' : 'bad');
      onFeedback(isGood);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleFeedback(true)}
        disabled={selected !== null}
        className={`p-1.5 rounded-full transition-all ${
          selected === 'good' 
            ? 'bg-gray-100 scale-110' 
            : selected === 'bad' 
              ? 'opacity-40 cursor-not-allowed' 
              : 'hover:bg-gray-50 hover:scale-110'
        }`}
        aria-label="Good response"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      </button>
      <button
        onClick={() => handleFeedback(false)}
        disabled={selected !== null}
        className={`p-1.5 rounded-full transition-all ${
          selected === 'bad' 
            ? 'bg-gray-100 scale-110' 
            : selected === 'good' 
              ? 'opacity-40 cursor-not-allowed' 
              : 'hover:bg-gray-50 hover:scale-110'
        }`}
        aria-label="Bad response"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
        </svg>
      </button>
    </div>
  );
};
