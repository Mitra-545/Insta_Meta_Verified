import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ email, onResendEmail, onContinue }) => {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="CheckCircle" size={32} color="#10B981" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Account Created Successfully!
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        We've sent a verification email to{' '}
        <span className="font-medium text-gray-900">{email}</span>.
        Please check your inbox and click the verification link to activate your account.
      </p>
      
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={onContinue}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Login
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={onResendEmail}
          iconName="Mail"
          iconPosition="left"
        >
          Resend Verification Email
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        Didn't receive the email? Check your spam folder or try resending.
      </p>
    </div>
  );
};

export default SuccessMessage;