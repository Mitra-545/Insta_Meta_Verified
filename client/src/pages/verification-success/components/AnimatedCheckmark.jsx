import React, { useEffect, useState } from 'react';
import { cn } from '../../../utils/cn';

const AnimatedCheckmark = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Outer circle with scale animation */}
      <div className={cn(
        "w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto transition-all duration-500",
        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      )}>
        {/* Inner circle with pulse effect */}
        <div className={cn(
          "w-16 h-16 bg-white rounded-full flex items-center justify-center transition-all duration-300",
          isAnimating && "animate-pulse-subtle"
        )}>
          {/* Checkmark SVG */}
          <svg
            className={cn(
              "w-8 h-8 text-green-600 transition-all duration-700",
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              className={cn(
                "transition-all duration-1000",
                isAnimating && "animate-pulse"
              )}
              style={{
                strokeDasharray: 24,
                strokeDashoffset: isVisible ? 0 : 24,
                transition: 'stroke-dashoffset 0.8s ease-in-out'
              }}
            />
          </svg>
        </div>
      </div>

      {/* Ripple effect */}
      <div className={cn(
        "absolute inset-0 rounded-full border-2 border-green-400 transition-all duration-1000",
        isVisible ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
      )} />
    </div>
  );
};

export default AnimatedCheckmark;