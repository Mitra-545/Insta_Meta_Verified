import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import VerificationCodeInput from './components/VerificationCodeInput';
import ResendTimer from './components/ResendTimer';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: ''
  });
  
  const [formState, setFormState] = useState({
    isLoading: false,
    isResending: false,
    emailSent: false,
    canResend: false,
    error: null
  });

  const [errors, setErrors] = useState({});

  // Initialize email from localStorage if available
  useEffect(() => {
    const savedEmail = localStorage.getItem('verification_email');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setFormState(prev => ({ ...prev, emailSent: true }));
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true }));
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('verification_email', formData.email);
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        emailSent: true,
        canResend: false
      }));
    }, 1500);
  };

  const handleResendCode = async () => {
    setFormState(prev => ({ ...prev, isResending: true }));
    
    // Simulate API call
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        isResending: false,
        canResend: false
      }));
    }, 1000);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      setErrors({ code: 'Please enter a 6-digit verification code' });
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true }));
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      // Clear stored email
      localStorage.removeItem('verification_email');
      navigate('/verification-success');
    }, 2000);
  };

  const handleCodeChange = (code) => {
    setFormData(prev => ({ ...prev, verificationCode: code }));
    if (errors.code) {
      setErrors(prev => ({ ...prev, code: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleTimerComplete = () => {
    setFormState(prev => ({ ...prev, canResend: true }));
  };

  const handleWrongEmail = () => {
    setFormState(prev => ({ ...prev, emailSent: false }));
    setFormData(prev => ({ ...prev, verificationCode: '' }));
    localStorage.removeItem('verification_email');
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
              Instagram Meta Verified 
            </h1>
          </div>

          {!formState.emailSent ? (
            // Email Input Form
            <form onSubmit={handleSendCode} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} color="#6B7280" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Verify Your Email
                </h2>
                <p className="text-sm text-gray-600">
                  Enter your email address to receive a verification code
                </p>
              </div>

              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleEmailChange}
                error={errors.email}
                disabled={formState.isLoading}
                required
              />

              <Button
                type="submit"
                fullWidth
                loading={formState.isLoading}
                disabled={formState.isLoading}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold py-3"
              >
                {formState.isLoading ? 'Sending Code...' : 'Send Code'}
              </Button>
            </form>
          ) : (
            // Verification Code Form
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} color="#059669" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Check Your Email
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  We've sent a verification code to
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {formData.email}
                </p>
              </div>

              <div className="space-y-4">
                <VerificationCodeInput
                  value={formData.verificationCode}
                  onChange={handleCodeChange}
                  error={errors.code}
                />

                <Button
                  type="submit"
                  fullWidth
                  loading={formState.isLoading}
                  disabled={formState.isLoading || formData.verificationCode.length !== 6}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold py-3"
                >
                  {formState.isLoading ? 'Verifying...' : 'Verify'}
                </Button>
              </div>

              <div className="text-center space-y-3">
                <div className="text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  {formState.canResend ? (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={formState.isResending}
                      className="text-primary font-semibold hover:underline transition-colors duration-200"
                    >
                      {formState.isResending ? 'Resending...' : 'Resend'}
                    </button>
                  ) : (
                    <ResendTimer onComplete={handleTimerComplete} />
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleWrongEmail}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  Wrong email?
                </button>
              </div>
            </form>
          )}

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <Link to="/help" className="hover:text-gray-700 transition-colors duration-200">
                Help
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-gray-700 transition-colors duration-200">
                Terms
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-gray-700 transition-colors duration-200">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Registration Link */}
        <div className="bg-white border border-gray-200 rounded-lg mt-4 p-4 text-center">
          <p className="text-sm text-gray-600">
            Need to create an account?{' '}
            <Link 
              to="/user-registration" 
              className="text-primary font-semibold hover:underline transition-colors duration-200"
            >
              Sign up
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

export default EmailVerification;