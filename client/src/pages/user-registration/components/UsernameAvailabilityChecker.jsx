import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const UsernameAvailabilityChecker = ({ username, onAvailabilityChange }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState(null);

  // Mock unavailable usernames
  const unavailableUsernames = [
    'admin', 'instagram', 'user', 'test', 'john', 'jane', 'mike', 'sarah',
    'alex', 'chris', 'david', 'emma', 'lisa', 'mark', 'anna', 'tom'
  ];

  useEffect(() => {
    if (!username || username.length < 3) {
      setAvailability(null);
      onAvailabilityChange(null);
      return;
    }

    setIsChecking(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const isAvailable = !unavailableUsernames.includes(username.toLowerCase());
      setAvailability(isAvailable);
      onAvailabilityChange(isAvailable);
      setIsChecking(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [username, onAvailabilityChange]);

  if (!username || username.length < 3) return null;

  return (
    <div className="mt-2 flex items-center space-x-2">
      {isChecking ? (
        <>
          <div className="animate-spin">
            <Icon name="Loader2" size={16} color="#6B7280" />
          </div>
          <span className="text-sm text-gray-500">Checking availability...</span>
        </>
      ) : availability === true ? (
        <>
          <Icon name="CheckCircle" size={16} color="#10B981" />
          <span className="text-sm text-green-600">Username is available</span>
        </>
      ) : availability === false ? (
        <>
          <Icon name="XCircle" size={16} color="#EF4444" />
          <span className="text-sm text-red-600">Username is not available</span>
        </>
      ) : null}
    </div>
  );
};

export default UsernameAvailabilityChecker;