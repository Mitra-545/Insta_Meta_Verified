import React, { useState, useEffect } from 'react';

const ResendTimer = ({ onComplete, initialTime = 30 }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <span className="text-gray-500 font-medium">
      Resend in {formatTime(timeLeft)}
    </span>
  );
};

export default ResendTimer;