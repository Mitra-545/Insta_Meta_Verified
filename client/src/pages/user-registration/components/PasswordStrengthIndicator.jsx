import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { strength: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 4) return { strength: 3, label: 'Good', color: 'bg-blue-500' };
    return { strength: 4, label: 'Strong', color: 'bg-green-500' };
  };

  const { strength, label, color } = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex space-x-1 mb-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              level <= strength ? color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs transition-colors duration-200 ${
        strength === 1 ? 'text-red-500' :
        strength === 2 ? 'text-yellow-500' :
        strength === 3 ? 'text-blue-500': 'text-green-500'
      }`}>
        Password strength: {label}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;