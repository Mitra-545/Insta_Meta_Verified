import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';

const VerificationCodeInput = ({ value, onChange, error }) => {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Initialize digits from value
    if (value) {
      const newDigits = value.split('').slice(0, 6);
      while (newDigits.length < 6) {
        newDigits.push('');
      }
      setDigits(newDigits);
    }
  }, [value]);

  const handleDigitChange = (index, digit) => {
    // Only allow single digit
    if (digit.length > 1) {
      digit = digit.slice(-1);
    }

    // Only allow numbers
    if (digit && !/^\d$/.test(digit)) {
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);

    // Call onChange with complete code
    const code = newDigits.join('');
    onChange?.(code);

    // Auto advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const pastedDigits = pastedText.replace(/\D/g, '').slice(0, 6);
    
    const newDigits = Array(6).fill('');
    for (let i = 0; i < pastedDigits.length; i++) {
      newDigits[i] = pastedDigits[i];
    }
    
    setDigits(newDigits);
    onChange?.(newDigits.join(''));
    
    // Focus on next empty input or last input
    const nextEmptyIndex = newDigits.findIndex(d => !d);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center space-x-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength="1"
            value={digit}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "w-12 h-12 text-center text-lg font-semibold rounded-md border-2 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
              "bg-gray-50 hover:bg-gray-100",
              digit ? "border-purple-500 bg-purple-50" : "border-gray-300",
              error && "border-red-500 bg-red-50"
            )}
            placeholder="0"
          />
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default VerificationCodeInput;