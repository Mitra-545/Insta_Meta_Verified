import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FormAutoSave = ({ formData, isAutoSaving, lastSaved }) => {
  useEffect(() => {
    // Auto-save form data to localStorage
    const saveTimer = setTimeout(() => {
      if (formData.username || formData.email || formData.password) {
        localStorage.setItem('signup_draft', JSON.stringify({
          ...formData,
          password: '', // Don't save password for security
          confirmPassword: '',
          lastSaved: new Date().toISOString()
        }));
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [formData]);

  if (!lastSaved) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mb-4 text-xs text-gray-500">
      {isAutoSaving ? (
        <>
          <div className="animate-spin">
            <Icon name="Loader2" size={12} />
          </div>
          <span>Saving draft...</span>
        </>
      ) : (
        <>
          <Icon name="Check" size={12} color="#10B981" />
          <span>Draft saved {lastSaved}</span>
        </>
      )}
    </div>
  );
};

export default FormAutoSave;