import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import AnimatedCheckmark from './components/AnimatedCheckmark';
import ProgressIndicator from './components/ProgressIndicator';

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after checkmark animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/user-registration');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
          {/* Instagram Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Icon name="Camera" size={24} color="white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Instagram
            </h1>
          </div>

          {/* Animated Checkmark */}
          <div className="text-center mb-8">
            <AnimatedCheckmark />
          </div>

          {/* Main Content */}
          <div className={`text-center space-y-6 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Request Submitted Successfully
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your request has been created. Please wait 24 hours for approval of your verified user account.
              </p>
            </div>

            {/* Progress Indicator */}
            <ProgressIndicator />

            {/* Timeline Information */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Request submitted</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700">Under review (up to 24 hours)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">Verification complete</span>
              </div>
            </div>

            {/* Helpful Tips */}
            <div className="bg-blue-50 rounded-lg p-4 text-left">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                What happens next?
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Our team will review your request</li>
                <li>• You'll receive an email notification</li>
                <li>• The blue checkmark will appear on your profile</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleContinue}
                fullWidth
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold py-3"
              >
                Continue to Instagram
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                View Request Status
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <Link to="/help" className="hover:text-gray-700 transition-colors duration-200">
                Help Center
              </Link>
              <span>•</span>
              <Link to="/support" className="hover:text-gray-700 transition-colors duration-200">
                Support
              </Link>
              <span>•</span>
              <Link to="/verification-help" className="hover:text-gray-700 transition-colors duration-200">
                Verification Help
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white border border-gray-200 rounded-lg mt-4 p-4 text-center">
          <p className="text-sm text-gray-600">
            Need help with your verification?{' '}
            <Link 
              to="/verification-support" 
              className="text-primary font-semibold hover:underline transition-colors duration-200"
            >
              Contact Support
            </Link>
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Instagram Clone. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default VerificationSuccess;