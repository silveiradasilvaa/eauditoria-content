import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`flex items-center p-4 rounded-lg shadow-lg max-w-md ${
        type === 'success' 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-red-50 border border-red-200'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
        )}
        
        <p className={`text-sm font-medium ${
          type === 'success' ? 'text-green-800' : 'text-red-800'
        }`}>
          {message}
        </p>
        
        <button
          onClick={onClose}
          className={`ml-3 flex-shrink-0 p-1 rounded-md hover:bg-opacity-75 transition-colors ${
            type === 'success' 
              ? 'text-green-600 hover:bg-green-100' 
              : 'text-red-600 hover:bg-red-100'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};