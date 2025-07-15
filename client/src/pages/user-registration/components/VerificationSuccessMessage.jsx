import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CountdownTimer from './CountdownTimer';

const VerificationSuccessMessage = ({ email, onBackToHome }) => {
  const handleTimerComplete = () => {
    alert('Verification request timer has expired. You may submit a new request.');
  };

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="Clock" size={32} color="#3B82F6" />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Verification Request Submitted!
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Thank you for submitting your verification request. We've received your application and will review it within 24 hours.
      </p>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800 mb-3">
          <strong>Processing Time Remaining:</strong>
        </p>
        <CountdownTimer 
          initialHours={24} 
          onTimerComplete={handleTimerComplete}
        />
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center mb-2">
          <Icon name="CheckCircle" size={20} color="#10B981" />
          <span className="ml-2 text-green-800 font-medium">Submission Successful</span>
        </div>
        <p className="text-sm text-green-700">
          Your verification request has been successfully submitted. Please check later or wait for our review team to process your application.
        </p>
      </div>
      
      <div className="space-y-3">
       
      <a
  href="https://www.instagram.com/"
  className="
    inline-flex items-center justify-center
    w-full px-4 py-2
    text-white font-semibold text-sm
    bg-gradient-to-r from-blue-500 to-blue-600
    hover:from-blue-600 hover:to-blue-700
    rounded-md shadow-sm transition-all duration-200
  "
>
 
  Back to Home
</a>

     
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        You will be notified via email once your verification request has been reviewed.
      </p>
    </div>
  );
};

export default VerificationSuccessMessage;