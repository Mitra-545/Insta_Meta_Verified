import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialHours = 24, onTimerComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(() => {
    // Check if there's a saved timer in localStorage
    const savedTimer = localStorage.getItem('verification_timer');
    if (savedTimer) {
      const { endTime } = JSON.parse(savedTimer);
      const now = new Date().getTime();
      const remaining = endTime - now;
      
      if (remaining > 0) {
        return Math.floor(remaining / 1000); // Convert to seconds
      }
    }
    
    // If no saved timer or it's expired, start new timer
    const endTime = new Date().getTime() + (initialHours * 60 * 60 * 1000);
    localStorage.setItem('verification_timer', JSON.stringify({ endTime }));
    return initialHours * 60 * 60; // Convert hours to seconds
  });

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimerComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          localStorage.removeItem('verification_timer');
          onTimerComplete?.();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimerComplete]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: remainingSeconds.toString().padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(timeRemaining);

  return (
    <div className="flex items-center justify-center space-x-2 text-2xl font-mono font-bold text-gray-800">
      <div className="bg-gray-100 rounded-lg px-3 py-2">
        <span>{hours}</span>
        <div className="text-xs text-gray-500 text-center">HRS</div>
      </div>
      <span className="text-gray-400">:</span>
      <div className="bg-gray-100 rounded-lg px-3 py-2">
        <span>{minutes}</span>
        <div className="text-xs text-gray-500 text-center">MIN</div>
      </div>
      <span className="text-gray-400">:</span>
      <div className="bg-gray-100 rounded-lg px-3 py-2">
        <span>{seconds}</span>
        <div className="text-xs text-gray-500 text-center">SEC</div>
      </div>
    </div>
  );
};

export default CountdownTimer;