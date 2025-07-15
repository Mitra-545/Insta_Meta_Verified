import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const PhoneVerificationToggle = ({ 
  enablePhoneVerification, 
  onToggleChange, 
  phoneNumber, 
  onPhoneChange,
  phoneError 
}) => {
  return (
    <div className="mb-6">
      <Checkbox
        label="Add phone number for account security"
        description="We'll send you a verification code to confirm your number"
        checked={enablePhoneVerification}
        onChange={(e) => onToggleChange(e.target.checked)}
        className="mb-4"
      />
      
      {enablePhoneVerification && (
        <div className="ml-6 animate-in slide-in-from-top-2 duration-200">
          <Input
            type="tel"
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            value={phoneNumber}
            onChange={(e) => onPhoneChange(e.target.value)}
            error={phoneError}
            required
            className="max-w-xs"
          />
          <p className="text-xs text-gray-500 mt-1">
            Standard messaging rates may apply
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneVerificationToggle;