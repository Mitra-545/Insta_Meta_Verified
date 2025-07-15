import React, { useEffect, useState } from 'react';
import { cn } from '../../../utils/cn';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgress(25); // Show initial progress
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={cn(
            "bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out",
            progress > 0 && "animate-pulse-subtle"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Text */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
        <Icon name="Clock" size={16} color="#6B7280" />
        <span>Estimated review time: 24 hours</span>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse" />
          Under Review
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;