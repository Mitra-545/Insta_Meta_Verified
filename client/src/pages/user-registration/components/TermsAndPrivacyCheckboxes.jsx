import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';

const TermsAndPrivacyCheckboxes = ({ 
  agreedToTerms, 
  onTermsChange, 
  agreedToPrivacy, 
  onPrivacyChange,
  termsError,
  privacyError 
}) => {
  return (
    <div className="space-y-4 mb-6">
      <Checkbox
        label={
          <span className="text-sm">
            I agree to the{' '}
            <a 
              href="#" 
              className="text-primary hover:underline font-medium"
              onClick={(e) => e.preventDefault()}
            >
              Terms of Service
            </a>
          </span>
        }
        checked={agreedToTerms}
        onChange={(e) => onTermsChange(e.target.checked)}
        error={termsError}
        required
      />
      
      <Checkbox
        label={
          <span className="text-sm">
            I agree to the{' '}
            <a 
              href="#" 
              className="text-primary hover:underline font-medium"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
          </span>
        }
        checked={agreedToPrivacy}
        onChange={(e) => onPrivacyChange(e.target.checked)}
        error={privacyError}
        required
      />
      
      <Checkbox
        label={
          <span className="text-sm text-gray-600">
            I would like to receive marketing emails and updates (optional)
          </span>
        }
       
        onChange={() => {}}
      />
    </div>
  );
};

export default TermsAndPrivacyCheckboxes;