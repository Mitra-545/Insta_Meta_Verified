import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProfilePictureUpload = ({ onImageSelect, selectedImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        onImageSelect({
          file,
          preview: e.target.result,
          name: file.name
        });
        setIsUploading(false);
      }, 1000); // Simulate upload delay
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Profile Picture (Optional)
      </label>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
            {selectedImage ? (
              <Image
                src={selectedImage.preview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="User" size={32} color="#9CA3AF" />
            )}
          </div>
          
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="animate-spin">
                <Icon name="Loader2" size={20} color="white" />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
            >
              {selectedImage ? 'Change Photo' : 'Upload Photo'}
            </Button>
            
            {selectedImage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveImage}
                disabled={isUploading}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Recommended: Square image, at least 150x150 pixels. Max file size: 5MB.
      </p>
    </div>
  );
};

export default ProfilePictureUpload;