import React from 'react';
import Button from '../../../components/ui/Button';


const SocialSignupButtons = ({ onFacebookSignup, onGoogleSignup, loading }) => {
  return (
    <div className="space-y-3 mb-6">
      <Button
        variant="outline"
        fullWidth
        onClick={onFacebookSignup}
        disabled={loading}
        className="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors duration-200"
        iconName="Facebook"
        iconPosition="left"
        iconSize={20}
      >
        Continue with Facebook
      </Button>
      
      <Button
        variant="outline"
        fullWidth
        onClick={onGoogleSignup}
        disabled={loading}
        className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        iconName="Chrome"
        iconPosition="left"
        iconSize={20}
      >
        Continue with Google
      </Button>
      
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500 bg-white">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
    </div>
  );
};

export default SocialSignupButtons;