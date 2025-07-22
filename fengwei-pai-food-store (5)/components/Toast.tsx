
import React, { useEffect } from 'react';
import { ToastMessage } from '../types';
import { CloseIcon } from './icons';

interface ToastProps {
  toast: ToastMessage;
  removeToast: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, removeToast]);

  const baseClasses = "flex items-center justify-between w-full max-w-xs p-4 text-white rounded-lg shadow-lg";
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[toast.type]}`}>
      <div className="text-sm font-semibold">{toast.message}</div>
      <button onClick={() => removeToast(toast.id)} className="ml-4 text-white hover:text-gray-200">
        <CloseIcon className="w-5 h-5"/>
      </button>
    </div>
  );
};


interface ToastContainerProps {
    toasts: ToastMessage[];
    removeToast: (id: number) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-5 right-5 z-[100] space-y-2">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} removeToast={removeToast} />
            ))}
        </div>
    );
}

export default ToastContainer;
   